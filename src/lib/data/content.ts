import { db } from "@/lib/db";
import { siteContent, testimonials } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getSiteContent(section?: string) {
  if (section) {
    return db
      .select()
      .from(siteContent)
      .where(eq(siteContent.section, section))
      .orderBy(siteContent.sortOrder);
  }
  return db.select().from(siteContent).orderBy(siteContent.sortOrder);
}

export async function getApprovedTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isApproved, true))
    .orderBy(testimonials.createdAt);
}

export async function getAllTestimonials() {
  return db
    .select()
    .from(testimonials)
    .orderBy(testimonials.createdAt);
}
