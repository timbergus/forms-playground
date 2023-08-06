import { z } from 'zod'

export const emailValidator = (property: string, isRequired: boolean) =>
  z.object({
    [property]: z
      .string()
      .email({
        message: 'This email is invalid',
      })
      .or(z.literal(''))
      .or(z.literal(null))
      .or(z.literal(undefined))
      .refine((value) => !isRequired || value, {
        message: 'This field is required',
      })
      .transform((value) => (value ? value : null)),
  })
