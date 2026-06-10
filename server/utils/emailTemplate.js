export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff; color: #1f2937;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #3b82f6;">Final Project Management - Password Reset Request</h2>
      <p style="font-size: 14px; color: #6b7280; margin: 5px 0 0 0;">Secure access to your learning journey</p>
    </div>

    <!-- Body -->
    <p style="font-size: 16px; color: #374151;">Dear User,</p>
    <p style="font-size: 16px; color: #374151;">
      We received a request to reset your password. Click the button below to set a new password for your account.
    </p>

    <!-- Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetPasswordUrl}"
        style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; background-color: #3b82f6;">
        Reset Password
      </a>
    </div>

    <p style="font-size: 15px; color: #374151;">
      If you did not request a password reset, please ignore this email or contact support if you have any questions. This link will expire in <b>10 minutes</b>.
    </p>

    <p style="font-size: 16px; color: #374151;">
      If the button above does not work, please copy and paste the following link into your browser:
    </p>

    <!-- Link -->
    <p style="font-size: 14px; color: #3b82f6; word-break: break-word;">
      ${resetPasswordUrl}
    </p>

    <!-- Footer -->
    <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #6b7280;">
      <p>
        Thank you,<br>
        <strong>Project Management System Team</strong>
      </p>
      <p style="font-size: 12px; color: #9ca3af;">
        this is an automated email, please do not reply.
      </p>
    </footer>

  </div>
  `;
}