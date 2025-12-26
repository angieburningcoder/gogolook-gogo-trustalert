import { NextResponse } from 'next/server';

/**
 * Internal API route for lead collection
 *
 * 🔧 Extensible: This is a placeholder that logs to console.
 * You can extend this to:
 * - Store in Cloudflare D1 / KV
 * - Send to email via Resend / SendGrid
 * - Post to Slack / Discord webhook
 * - Store in Airtable / Google Sheets
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required field
    if (!data.email || !data.email.includes('@')) {
      return NextResponse.json(
        { success: false, message: '請提供有效的電子郵件地址' },
        { status: 400 }
      );
    }

    // 🔍 Insight: Log lead data for analysis
    console.log('[Lead Captured]', {
      email: data.email,
      company_size: data.company_size,
      role: data.role,
      impersonation_type: data.impersonation_type,
      timestamp: data.timestamp,
      source: data.source,
    });

    // 🔧 TODO: Add your backend logic here
    // Example:
    /*
    // Store in database
    await db.insert('leads', data);

    // Send notification email
    await sendEmail({
      to: 'team@company.com',
      subject: 'New Lead from Fake Door',
      body: `Email: ${data.email}\nCompany Size: ${data.company_size}...`
    });

    // Post to Slack
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        text: `🎯 New lead: ${data.email}`
      })
    });
    */

    return NextResponse.json({
      success: true,
      message: '感謝您的關注！我們會盡快與您聯繫。',
    });
  } catch (error) {
    console.error('[Lead API Error]', error);
    return NextResponse.json(
      { success: false, message: '系統錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}
