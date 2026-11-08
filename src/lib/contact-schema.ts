import { z } from "zod";
import { contactCopy } from "@/data/contact";

const v = contactCopy.validation;

export const contactSchema = z.object({
  name: z.string().trim().min(2, v.nameMin).max(80, v.nameMax),
  email: z.string().trim().email(v.emailInvalid).max(120, v.emailMax),
  message: z.string().trim().min(10, v.messageMin).max(2000, v.messageMax),
  // Honeypot: manusia tidak melihat field ini, bot sering mengisinya.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;