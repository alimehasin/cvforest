import { Resend } from 'resend';
import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  return resend.emails.send({
    from: env.RESEND_FROM_ADDRESS,
    to,
    subject,
    html,
  });
}
