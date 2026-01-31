import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

export function useSignInForm() {
  const schema = z.object({
    email: z.email(),
    password: z.string(),
  });

  return useForm<z.infer<typeof schema>>({
    validate: zod4Resolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });
}
