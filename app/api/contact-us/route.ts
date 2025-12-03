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

    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true, // true for port 465
        auth: {
            user: process.env.EMAIL_USER, // your GoDaddy email (e.g., you@yourdomain.com)
            pass: process.env.EMAIL_PASS  // app-specific password or email account password
        }
    });
    const mailOptions = {
        from: `"Trendforce Consulting Contact Form" <no-reply@trendforceconsulting.com>`,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: subject,
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


    try {
       const info = await transporter.sendMail(mailOptions);
        console.log("🚀 ~ POST ~ info:", info)
        return NextResponse.json({ success: true, message: "Email sent successfully!" });
    } catch (error: any) {
        console.error("Error sending email:", error.message);
        return NextResponse.json(
            { success: false, message: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}