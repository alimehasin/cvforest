/**
 * Returns HTML for the email verification transactional email.
 * Uses table-based layout and inline styles for broad client support.
 */
export function getVerifyEmailHtml(url: string): string {
  const urlSafeText = Bun.escapeHTML(url);

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f4; padding: 24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        <tr>
          <td style="padding: 32px 32px 24px 32px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #333333;">CV Forest</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 24px 32px;">
            <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.5; color: #333333;">Please verify your email to finish signing up.</p>
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius: 8px; background-color: #166534;">
                  <a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 24px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">Verify my email</a>
                </td>
              </tr>
            </table>
            <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.5; color: #666666;">Or copy this link:</p>
            <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.5; color: #166534; word-break: break-all;">${urlSafeText}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 32px 32px 32px; border-top: 1px solid #eeeeee;">
            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #666666;">If you didn't create an account, you can ignore this email.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim();
}
