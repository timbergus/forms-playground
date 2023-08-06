import { z } from 'zod'

export const stringValidator = (property: string, isRequired: boolean) =>
  z.object({
    [property]: z
      .string()
      .min(3)
      .max(10)
      .or(z.literal(''))
      .or(z.literal(null))
      .or(z.literal(undefined))
      .refine((value) => !isRequired || value, {
        message: 'This field is required',
      })
      .transform((value) => (value ? value : null)),
  })
