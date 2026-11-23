import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

    if (!process.env.RESEND_API_KEY || !adminEmail) {
      return NextResponse.json({ skipped: true });
    }

    await resend.emails.send({
      from: 'Ramess Tours <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Booking Request: ${body.tour_title} (${body.full_name})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #020617; color: #ffffff; padding: 20px;">
            <h2 style="margin: 0; color: #fbbf24;">New Tour Booking Request</h2>
            <p style="margin: 5px 0 0; font-size: 13px; color: #cbd5e1;">Ramess Tours Lead Alert</p>
          </div>
          <div style="padding: 20px; color: #0f172a; line-height: 1.6;">
            <p><strong>Tour:</strong> ${body.tour_title}</p>
            <p><strong>Customer Name:</strong> ${body.full_name}</p>
            <p><strong>WhatsApp / Phone:</strong> ${body.phone}</p>
            <p><strong>Email:</strong> ${body.email || 'Not provided'}</p>
            <p><strong>Nationality:</strong> ${body.nationality || 'Not specified'}</p>
            <p><strong>Travel Date:</strong> ${body.travel_date}</p>
            <p><strong>Guests:</strong> ${body.adults} Adults, ${body.children} Children</p>
            <p><strong>Language:</strong> ${String(body.locale || 'en').toUpperCase()}</p>
            <p><strong>Notes:</strong> ${body.notes || 'None'}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}