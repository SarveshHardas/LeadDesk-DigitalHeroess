import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .transform((val) => val.toLowerCase().trim()),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
