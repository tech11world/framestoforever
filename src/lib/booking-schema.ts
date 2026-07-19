import { z } from "zod";

export const bookingSchema = z.object({
  fullName:  z.string().trim().min(2, "Please enter your full name").max(100),
  email:     z.string().trim().email("Please enter a valid email").max(200),
  phone:     z.string().trim().min(6, "Enter a valid phone number").max(30),
  whatsapp:  z.string().trim().max(30).optional().or(z.literal("")),
  eventType: z.string().min(1, "Select an event type"),
  eventDate: z.string().min(1, "Choose a date"),
  location:  z.string().trim().min(2, "Where will it take place?").max(200),
  budget:    z.string().min(1, "Select a budget"),
  packageChoice: z.string().min(1, "Choose a package"),
  guests:    z.string().max(10).optional().or(z.literal("")),
  addons:    z.array(z.string()).default([]),
  message:   z.string().trim().max(1000).optional().or(z.literal("")),
  contactMethod: z.enum(["Email","Phone","WhatsApp"]),
  terms:     z.literal(true, { errorMap: () => ({ message: "Please accept the terms" }) }),
  honeypot:  z.string().optional(),
});
export type BookingFormState = {
  fullName: string; email: string; phone: string; whatsapp: string;
  eventType: string; eventDate: string; location: string; budget: string;
  packageChoice: string; guests: string; addons: string[]; message: string;
  contactMethod: "Email"|"Phone"|"WhatsApp"; terms: boolean; honeypot: string;
};
