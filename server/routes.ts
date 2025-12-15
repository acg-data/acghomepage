import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { Client as ObjectStorageClient } from "@replit/object-storage";

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

  // Admin routes for contact management (protected)
  const requireAuth = (req: Request, res: Response, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  app.get("/api/admin/contacts", requireAuth, async (_req: Request, res: Response) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.patch("/api/admin/contacts/:id/status", requireAuth, async (req: Request, res: Response) => {
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

  app.delete("/api/admin/contacts/:id", requireAuth, async (req: Request, res: Response) => {
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
