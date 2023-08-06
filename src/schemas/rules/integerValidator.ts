import { z } from 'zod'

export const integerValidator = (isRequired: boolean) =>
  z
    .number()
    .int()
    .positive()
    .min(18)
    .max(100)
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? value : null))
