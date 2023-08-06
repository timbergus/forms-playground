import { z } from 'zod'

export const emailValidator = (isRequired: boolean) =>
  z
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
    .transform((value) => value || null)
