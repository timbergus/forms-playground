import { z } from 'zod'
import { isRequired } from '../model/model'

export const schema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(10)
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired('firstName') || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? value : null)),
  lastName: z
    .string()
    .min(3)
    .max(10)
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired('lastName') || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? value : null)),
  dateOfBirth: z
    .date()
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired('dateOfBirth') || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? value : null)),
  age: z
    .number()
    .int()
    .positive()
    .min(18)
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired('age') || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? value : null)),
  email: z
    .string()
    .email({
      message: 'This email is invalid',
    })
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired('email') || value, {
      message: 'This field is required',
    })
    .transform((value) => (value ? value : null)),
})

export type Values = z.infer<typeof schema>
