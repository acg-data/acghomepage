import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertUserSchema, insertReportDownloadSchema } from "@shared/schema";
import path from "path";
import fs from "fs";
import { z } from "zod";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { Client as ObjectStorageClient } from "@replit/object-storage";
import { getResendClient } from "./integrations/resend";

// Cache the Q4 Hiring Abroad report PDF at startup
let q4HiringAbroadPdfBuffer: Buffer | null = null;
try {
  const pdfPath = path.join(process.cwd(), "attached_assets", "Outsourcing_Smartly_1765840196590.pdf");
  q4HiringAbroadPdfBuffer = fs.readFileSync(pdfPath);
  console.log("Q4 Hiring Abroad report PDF loaded successfully");
} catch (error) {
  console.error("Failed to load Q4 Hiring Abroad report PDF:", error);
}

const PgSession = connectPgSimple(session);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "user_sessions",
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "aryo-consulting-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification to Justin using Replit Resend integration
      try {
        const { client: resendClient, fromEmail } = await getResendClient();
        
        // Escape HTML in user-provided message to prevent XSS in emails
        const sanitizedMessage = validatedData.message
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
        
        await resendClient.emails.send({
          from: fromEmail || "Aryo Consulting <onboarding@resend.dev>",
          to: "justin@aryocg.com",
          subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Company:</strong> ${validatedData.company || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage}</p>
            <hr>
            <p><small>Submitted at ${new Date().toLocaleString()}</small></p>
          `,
        });
        console.log("Email notification sent successfully");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the contact submission if email fails
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your inquiry. Our team will contact you within 24 hours.",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Contact submission error:", error);
      res.status(500).json({ success: false, message: "Failed to submit contact form" });
    }
  });

  const registerSchema = insertUserSchema.extend({
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already registered" });
      }

      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        return res.status(400).json({ success: false, message: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const user = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword,
        email: validatedData.email,
        fullName: validatedData.fullName,
        company: validatedData.company,
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Login failed after registration" });
        }
        res.status(201).json({ 
          success: true, 
          user: { id: user.id, email: user.email, fullName: user.fullName, isPartner: user.isPartner }
        });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", (req: Request, res: Response, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ success: false, message: "Login failed" });
        }
        res.json({ 
          success: true, 
          user: { id: user.id, email: user.email, fullName: user.fullName, isPartner: user.isPartner }
        });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      res.json({ 
        authenticated: true, 
        user: { id: user.id, email: user.email, fullName: user.fullName, isPartner: user.isPartner }
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Admin routes for contact management (protected, partners only)
  const requireAuth = (req: Request, res: Response, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  const requirePartner = (req: Request, res: Response, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = req.user as any;
    if (!user?.isPartner) {
      return res.status(403).json({ message: "Access denied. Partner status required." });
    }
    next();
  };

  app.get("/api/admin/contacts", requirePartner, async (_req: Request, res: Response) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.patch("/api/admin/contacts/:id/status", requirePartner, async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      if (!status || !["pending", "contacted", "closed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const updated = await storage.updateContactSubmissionStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Failed to update contact" });
    }
  });

  app.delete("/api/admin/contacts/:id", requirePartner, async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteContactSubmission(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Failed to delete contact" });
    }
  });

  app.get("/api/case-studies", async (_req: Request, res: Response) => {
    try {
      const studies = await storage.getCaseStudies();
      res.json(studies);
    } catch (error) {
      console.error("Case studies error:", error);
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  app.get("/api/case-studies/:slug", async (req: Request, res: Response) => {
    try {
      const study = await storage.getCaseStudyBySlug(req.params.slug);
      if (!study) {
        return res.status(404).json({ message: "Case study not found" });
      }
      res.json(study);
    } catch (error) {
      console.error("Case study error:", error);
      res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  app.get("/api/blog", async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Blog posts error:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Blog post error:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/report/q4-2024", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Aryo-Q4-2024-Market-Report.pdf");
    
    const pdfContent = generateSimplePDF();
    res.send(pdfContent);
  });

  // Report download signup - emails the PDF to the user
  app.post("/api/reports/q4-hiring-abroad/signup", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReportDownloadSchema.parse({
        ...req.body,
        reportSlug: "q4-hiring-abroad"
      });
      
      // Check for existing signup with same email and report
      const existing = await storage.getReportDownloadByEmailAndSlug(validatedData.email, validatedData.reportSlug);
      if (existing) {
        // Already signed up, just return success (don't spam them)
        return res.status(200).json({ 
          success: true, 
          message: "Thank you! The report has been sent to your email."
        });
      }
      
      // Save to database
      const download = await storage.createReportDownload(validatedData);
      
      // Send email using Resend template via Replit integration
      try {
        const { client: resendClient, fromEmail } = await getResendClient();
        
        await resendClient.emails.send({
          from: fromEmail || "Aryo Consulting <onboarding@resend.dev>",
          to: validatedData.email,
          subject: "Your Q4 Hiring Abroad Report from Aryo Consulting Group",
          html: `
            <h2>Thank you for your interest, ${validatedData.firstName}!</h2>
            <p>We're pleased to share our Q4 Hiring Abroad Report: "Outsourcing Smartly: An American Business's Guide to Global Talent, Costs, and Collaboration".</p>
            <p>This comprehensive guide covers:</p>
            <ul>
              <li>Global talent markets across Asia, Africa, Europe, and Latin America</li>
              <li>Compensation benchmarks by expertise and region</li>
              <li>Hiring and payment platforms for international teams</li>
              <li>Best practices for managing remote global talent</li>
            </ul>
            <p><a href="${req.protocol}://${req.get('host')}/api/reports/q4-hiring-abroad/download">Download your report here</a></p>
            <p>If you have any questions or would like to discuss how Aryo Consulting Group can help with your international hiring strategy, please don't hesitate to reach out.</p>
            <hr>
            <p><strong>Aryo Consulting Group</strong><br>
            <a href="https://aryocg.com">aryocg.com</a></p>
          `
        });
        
        // Mark email as sent
        await storage.markReportEmailSent(download.id);
        console.log("Report email sent successfully to", validatedData.email);
      } catch (emailError) {
        console.error("Failed to send report email:", emailError);
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you! The report has been sent to your email."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      console.error("Report signup error:", error);
      res.status(500).json({ success: false, message: "Failed to process request" });
    }
  });

  const objectStorageClient = new ObjectStorageClient();

  app.get("/api/logos", async (_req: Request, res: Response) => {
    try {
      const result = await objectStorageClient.list();
      if (result.ok && result.value) {
        const logos = result.value
          .map((obj: { name: string }) => obj.name)
          .filter((name: string) => !name.toLowerCase().includes("aryo"));
        res.json(logos);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error listing logos:", error);
      res.status(500).json({ message: "Failed to list logos" });
    }
  });

  app.get("/api/logos/:filename", async (req: Request, res: Response) => {
    try {
      const filename = decodeURIComponent(req.params.filename);
      const result = await objectStorageClient.downloadAsBytes(filename);
      
      if (!result.ok || !result.value || !result.value[0]) {
        return res.status(404).json({ message: "Logo not found" });
      }

      const ext = filename.split('.').pop()?.toLowerCase();
      let contentType = 'image/png';
      if (ext === 'svg') contentType = 'image/svg+xml';
      else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
      else if (ext === 'png') contentType = 'image/png';

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(result.value[0]);
    } catch (error) {
      console.error("Error serving logo:", error);
      res.status(500).json({ message: "Failed to serve logo" });
    }
  });

  // Serve the Aryo company logo
  app.get("/api/aryo-logo", async (_req: Request, res: Response) => {
    try {
      const result = await objectStorageClient.list();
      if (!result.ok || !result.value) {
        return res.status(404).json({ message: "Logo not found" });
      }
      
      // Find the Aryo logo file
      const aryoFile = result.value.find((obj: { name: string }) => 
        obj.name.toLowerCase().includes("aryo") && obj.name.toLowerCase().includes("logo")
      );
      
      if (!aryoFile) {
        return res.status(404).json({ message: "Aryo logo not found" });
      }
      
      const logoResult = await objectStorageClient.downloadAsBytes(aryoFile.name);
      if (!logoResult.ok || !logoResult.value || !logoResult.value[0]) {
        return res.status(404).json({ message: "Logo not found" });
      }
      
      const ext = aryoFile.name.split('.').pop()?.toLowerCase();
      let contentType = 'image/png';
      if (ext === 'svg') contentType = 'image/svg+xml';
      else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(logoResult.value[0]);
    } catch (error) {
      console.error("Error serving Aryo logo:", error);
      res.status(500).json({ message: "Failed to serve logo" });
    }
  });

  // Serve the Q4 Hiring Abroad Report PDF from Object Storage
  app.get("/api/reports/q4-hiring-abroad/download", async (_req: Request, res: Response) => {
    try {
      const pdfPath = "Outsourcing Smartly.pdf";
      const result = await objectStorageClient.downloadAsBytes(pdfPath);
      
      if (!result.ok || !result.value || !result.value[0]) {
        return res.status(404).json({ message: "Report not found" });
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Aryo-Q4-Hiring-Abroad-Report.pdf"');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(result.value[0]);
    } catch (error) {
      console.error("Error serving Q4 report:", error);
      res.status(500).json({ message: "Failed to serve report" });
    }
  });

  return httpServer;
}

function generateSimplePDF(): Buffer {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 380 >>
stream
BT
/F1 24 Tf
50 720 Td
(Aryo Consulting Group) Tj
0 -40 Td
/F1 18 Tf
(Q4 2024 Market Report) Tj
0 -60 Td
/F1 12 Tf
(Executive Summary) Tj
0 -20 Td
(This report provides insights into market trends,) Tj
0 -15 Td
(operational strategies, and enterprise value creation) Tj
0 -15 Td
(opportunities for Q4 2024.) Tj
0 -40 Td
(Key Findings:) Tj
0 -20 Td
(- Enterprise value optimization increased 23% YoY) Tj
0 -15 Td
(- Digital transformation remains top priority) Tj
0 -15 Td
(- M&A activity continues to accelerate) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000698 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
775
%%EOF`;
  return Buffer.from(content, "utf-8");
}
