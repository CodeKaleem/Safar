import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

export async function POST(req: NextRequest) {
  try {
    const { inquiryId, customerEmail, customerName, replyMessage, originalMessage } = await req.json();
    if (
      typeof inquiryId !== 'string' ||
      typeof customerEmail !== 'string' ||
      typeof customerName !== 'string' ||
      typeof replyMessage !== 'string' ||
      typeof originalMessage !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid reply payload' }, { status: 400 });
    }

    const safeCustomerName = escapeHtml(customerName);
    const safeReplyMessage = escapeHtml(replyMessage).replace(/\n/g, '<br/>');
    const safeOriginalMessage = escapeHtml(originalMessage).replace(/\n/g, '<br/>');

    // Send the reply email to the customer
    const { error: emailError } = await resend.emails.send({
      from: 'SafarTravel Concierge <onboarding@resend.dev>',
      to: customerEmail,
      subject: `Re: Your SafarTravel Inquiry`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #050a12; color: #fff; padding: 40px; border-radius: 4px; max-width: 600px;">
          <div style="border-bottom: 1px solid rgba(200,169,110,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="color: #c8a96e; font-size: 24px; margin: 0; letter-spacing: 2px;">SAFARTRAVEL</h1>
            <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 3px; margin: 8px 0 0;">RESPONSE FROM OUR CONCIERGE TEAM</p>
          </div>

          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.8;">Dear ${safeCustomerName},</p>
          
          <div style="margin: 24px 0; padding: 24px; background: rgba(200,169,110,0.05); border-left: 3px solid #c8a96e;">
            <p style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.8; margin: 0;">${safeReplyMessage}</p>
          </div>

          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 32px;">Regards,<br/>SafarTravel Concierge Team</p>

          <hr style="border: none; border-top: 1px dashed rgba(200,169,110,0.2); margin: 32px 0;" />
          <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 2px;">
            <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0 0 8px; letter-spacing: 2px;">YOUR ORIGINAL MESSAGE</p>
            <p style="color: rgba(255,255,255,0.4); font-size: 13px; font-style: italic; margin: 0;">${safeOriginalMessage}</p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: emailError.message }, { status: 500 });
    }

    // Mark the inquiry as replied in Supabase
    const { error: dbError } = await supabase
      .from('inquiries')
      .update({ replied: true, admin_reply: replyMessage })
      .eq('id', inquiryId);

    if (dbError) {
      console.error('DB error:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('API error:', err);
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
