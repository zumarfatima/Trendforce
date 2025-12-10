import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, subject, message } = body;

  // Ensure all fields are provided
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: process.env.ADMIN_EMAIL_USER, // your GoDaddy email
      pass: process.env.ADMIN_EMAIL_PASS  // app-specific password or email password
    }
  });

  // Email to admin
  const adminMailOptions = {
    from: `"Trendforce Consulting Contact Form" <no-reply@trendforceconsulting.com>`,
    replyTo: email,
    to: process.env.ADMIN_EMAIL_USER,
    subject: `New Contact Form Submission: ${subject}`,
    text: `
You have received a new message:

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Message: ${message}
    `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #d32f2f; text-align: center;">New Contact Form Submission</h2>
            <hr style="margin: 20px 0;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
            <hr style="margin: 20px 0;" />
            <p style="text-align: center; font-size: 12px; color: #888;">Trendforce Consulting © ${new Date().getFullYear()}</p>
          </div>
        `,
  };

  // Confirmation email to user
  const userMailOptions = {
    from: `"Trendforce Consulting" <no-reply@trendforceconsulting.com>`,
    to: email,
    subject: "Thank you for contacting Trendforce Consulting",
    text: `Hi ${name},

            Thank you for reaching out! We have received your message and will get back to you shortly.

            Your message:
            ${message}

            Best regards,
            Trendforce Consulting Team
                `,
                html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #d32f2f;">Thank you for contacting us</h2>
            <hr style="margin: 20px 0;" />
            <p><strong>Hi</strong> ${name},</p>
            <p>Thank you for reaching out to us. We’ve received your message and will get back to you as soon as possible.</p>
            <p><strong>Best regards,</strong></p>
            <p>TrendForce Consulting Team</p>
            </div>
    `,
  };

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Send confirmation email to user
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true, message: "Emails sent successfully!" });
  } catch (error: any) {
    console.error("Error sending emails:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to send emails. Please try again later." },
      { status: 500 }
    );
  }
}
