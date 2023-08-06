import { z } from 'zod'

export const dateValidator = (isRequired: boolean) =>
  z
    .string()
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? new Date(value).toISOString() : null))
