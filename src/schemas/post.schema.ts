import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(6),
  content: z.string().min(6),
});

export type postSchemaType = z.infer<typeof postSchema>;
