import { env } from '@/env';
import { transporter } from './transporter';

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  const from = `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM_ADDRESS}>`;

  await transporter.sendMail({ from, to, subject, text, html });
}
