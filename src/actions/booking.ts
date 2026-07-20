import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "@/lib/booking-schema";
import { Resend } from "resend";

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const submitBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot check
    if (data.honeypot) {
      // Silently reject spam
      return { success: true };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL;
    
    console.log("HAS_RESEND_KEY", !!process.env.RESEND_API_KEY);
    console.log("HAS_OWNER_EMAIL", !!process.env.OWNER_EMAIL);

    if (!resendApiKey || !ownerEmail) {
      console.error("Missing environment variables: RESEND_API_KEY or OWNER_EMAIL");
      return { success: false, message: "Server configuration error" };
    }

    const resend = new Resend(resendApiKey);

    try {
      const safe = {
        fullName: escapeHtml(data.fullName),
        email: escapeHtml(data.email),
        phone: escapeHtml(data.phone),
        whatsapp: data.whatsapp ? escapeHtml(data.whatsapp) : '',
        eventType: escapeHtml(data.eventType),
        eventDate: escapeHtml(data.eventDate),
        location: escapeHtml(data.location),
        budget: escapeHtml(data.budget),
        packageChoice: escapeHtml(data.packageChoice),
        guests: data.guests ? escapeHtml(data.guests) : '',
        addons: data.addons.map(escapeHtml),
        contactMethod: escapeHtml(data.contactMethod),
        message: data.message ? escapeHtml(data.message) : '',
      };

      // Build owner email HTML
      const ownerHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Booking Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.fullName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.email}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.phone}</td></tr>
            ${safe.whatsapp ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>WhatsApp:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.whatsapp}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Event Type:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.eventType}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.eventDate}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Location:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.location}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.budget}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Package:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.packageChoice}</td></tr>
            ${safe.guests ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Guests:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.guests}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Add-ons:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.addons.length > 0 ? safe.addons.join(", ") : "None"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contact Method:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${safe.contactMethod}</td></tr>
          </table>
          ${safe.message ? `
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px;">${safe.message}</p>
          </div>` : ''}
        </div>
      `;

      // Build customer confirmation email HTML
      const customerHtml = `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #2c2926; text-align: center; padding: 40px 20px; background-color: #faf9f6;">
          <h1 style="font-size: 28px; font-weight: normal; margin-bottom: 20px; color: #1a1a1a;">Thank You, ${safe.fullName.split(' ')[0]}</h1>
          <p style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #4a453f; max-width: 450px; margin: 0 auto 30px;">
            We have received your enquiry for your upcoming ${safe.eventType.toLowerCase()}. 
            It is an honour to be considered to capture your story.
          </p>
          <p style="font-family: sans-serif; font-size: 15px; line-height: 1.6; color: #4a453f; max-width: 450px; margin: 0 auto 30px;">
            Our team will review your details and Fraz will personally contact you within the next 24 hours to discuss the possibilities.
          </p>
          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0dcd3;">
            <p style="font-family: sans-serif; font-size: 12px; color: #8a857f; text-transform: uppercase; letter-spacing: 2px;">Frames To Forever</p>
          </div>
        </div>
      `;

      // Send owner email
      const { error: ownerError } = await resend.emails.send({
        // TODO: Replace 'onboarding@resend.dev' with your verified production domain (e.g. 'booking@framestoforever.com')
        from: "Frames To Forever <bookings@framestoforever.in>",
        to: ownerEmail,
        subject: "New Booking Enquiry — Frames To Forever",
        html: ownerHtml,
        replyTo: safe.email,
      });

      if (ownerError) {
        console.error("Owner email failed: FULL RESEND ERROR:", JSON.stringify(ownerError, null, 2));
        throw new Error("Failed to send owner email");
      }

      // Send customer email
      try {
        const { error: customerError } = await resend.emails.send({
          // TODO: Replace 'onboarding@resend.dev' with your verified production domain
          from: "Frames To Forever <bookings@framestoforever.in>",
          to: safe.email,
          subject: "We've received your enquiry — Frames To Forever",
          html: customerHtml,
        });

        if (customerError) {
          console.error("CUSTOMER EMAIL FAILED", customerError);
        }
      } catch (error) {
        console.error("CUSTOMER EMAIL FAILED", error);
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending emails: FULL CATCH ERROR:", error instanceof Error ? error.stack : JSON.stringify(error, null, 2));
      return { success: false, message: "Failed to send booking enquiry." };
    }
  });
