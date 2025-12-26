/**
 * Lead submission utility
 *
 * Supports two modes:
 * 1. External endpoint (Formspree, Google Forms, etc.)
 * 2. Internal API route (/api/lead)
 */

export interface LeadFormData {
  email: string;
  company_size?: string;
  role?: string;
  impersonation_type?: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

/**
 * Submit lead form data
 *
 * 🔧 Configuration:
 * - Set NEXT_PUBLIC_SUBMIT_ENDPOINT in .env to use external service
 * - Leave empty to use internal /api/lead route
 */
export async function submitLead(data: LeadFormData): Promise<SubmitResult> {
  const endpoint =
    process.env.NEXT_PUBLIC_SUBMIT_ENDPOINT || '/api/lead';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'fake_door_landing',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse JSON response (for internal API)
    let result;
    try {
      result = await response.json();
    } catch {
      // External services might not return JSON
      result = { success: true };
    }

    return {
      success: true,
      message: result.message || '感謝您的關注！我們會盡快與您聯繫。',
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      message: '提交失敗，請稍後再試或直接聯繫我們。',
    };
  }
}
