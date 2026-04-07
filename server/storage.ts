import { 
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContact,
  type CaseStudy,
  type InsertCaseStudy,
  type BlogPost,
  type InsertBlogPost,
  type ReportDownload,
  type InsertReportDownload,
  users,
  contactSubmissions,
  caseStudies,
  blogPosts,
  reportDownloads
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
  
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostBySlugAdmin(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  createReportDownload(download: InsertReportDownload): Promise<ReportDownload>;
  getReportDownloads(): Promise<ReportDownload[]>;
  markReportEmailSent(id: string): Promise<void>;
  getReportDownloadByEmailAndSlug(email: string, reportSlug: string): Promise<ReportDownload | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(contact).returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmissionStatus(id: string, status: string): Promise<ContactSubmission | undefined> {
    const [updated] = await db.update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return result.length > 0;
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    const [study] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return study || undefined;
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [study] = await db.insert(caseStudies).values(caseStudy).returning();
    return study;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)));
    return post || undefined;
  }

  async getBlogPostBySlugAdmin(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(blogPost).returning();
    return post;
  }

  async updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts)
      .set(blogPost)
      .where(eq(blogPosts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async createReportDownload(download: InsertReportDownload): Promise<ReportDownload> {
    const [result] = await db.insert(reportDownloads).values(download).returning();
    return result;
  }

  async getReportDownloads(): Promise<ReportDownload[]> {
    return db.select().from(reportDownloads).orderBy(desc(reportDownloads.createdAt));
  }

  async markReportEmailSent(id: string): Promise<void> {
    await db.update(reportDownloads).set({ emailSent: true }).where(eq(reportDownloads.id, id));
  }

  async getReportDownloadByEmailAndSlug(email: string, reportSlug: string): Promise<ReportDownload | undefined> {
    const [result] = await db.select().from(reportDownloads)
      .where(and(eq(reportDownloads.email, email), eq(reportDownloads.reportSlug, reportSlug)));
    return result || undefined;
  }
}

export const storage = new DatabaseStorage();
