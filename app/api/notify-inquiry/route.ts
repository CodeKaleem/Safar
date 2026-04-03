import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || 'your-gmail@gmail.com';

    const { error } = await resend.emails.send({
      from: 'SafarTravel Inquiries <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #050a12; color: #fff; padding: 40px; border-radius: 4px; max-width: 600px;">
          <div style="border-bottom: 1px solid rgba(200,169,110,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #c8a96e; font-size: 24px; margin: 0; letter-spacing: 2px;">SAFARTRAVEL</h1>
            <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 3px; margin: 8px 0 0;">NEW INQUIRY NOTIFICATION</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; width: 120px;">SENDER</td>
              <td style="padding: 8px 0; color: #fff; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px;">EMAIL</td>
              <td style="padding: 8px 0; color: #c8a96e; font-size: 15px;">${email}</td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(200,169,110,0.15); border-radius: 2px;">
            <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; margin: 0 0 12px;">MESSAGE</p>
            <p style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.8; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin-top: 32px; text-align: center;">
            You can reply directly to this email to respond to the customer, or use your Admin Panel.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
