import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

export const phoneNumberZodValidator = z
  .string()
  .transform((value, ctx) => {
    const phoneNumber = parsePhoneNumber(value, {
      defaultCountry: 'IQ',
    });

    if (!phoneNumber?.isValid()) {
      ctx.addIssue({
        code: 'custom',
        message: 'رقم الهاتف غير صالح',
      });

      return z.NEVER;
    }

    return phoneNumber.formatInternational().replaceAll(' ', '');
  })
  .refine((value) => {
    return value.replaceAll(' ', '');
  });
