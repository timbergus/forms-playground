import { z } from 'zod'

export const dateValidator = (property: string, isRequired: boolean) =>
  z.object({
    [property]: z
      .string()
      .or(z.literal(''))
      .or(z.literal(null))
      .or(z.literal(undefined))
      .refine((value) => !isRequired || value, {
        message: 'This field is required',
      })
      .transform((value) => (value ? new Date(value).toISOString() : null)),
  })
