import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '@/env';

export const transporter: Transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_SECURE,
  auth: {
    user: env.EMAIL_USER_USERNAME,
    pass: env.EMAIL_USER_PASSWORD,
  },
});
