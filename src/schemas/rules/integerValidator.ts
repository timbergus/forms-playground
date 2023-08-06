import { z } from 'zod'

type IntegerValidator = {
  min?: number
  max?: number
  isRequired: boolean
}

export const integerValidator = ({ min, max, isRequired }: IntegerValidator) =>
  z
    .number()
    .int()
    .positive()
    .or(z.nan())
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired || value, {
      message: 'This field is required',
    })
    .refine((value) => (isRequired ? min && Number(value) >= min : true), {
      message: `It has to be greater or equal to ${min}`,
    })
    .refine((value) => (isRequired ? max && Number(value) <= max : true), {
      message: `It has to be smaller or equal to ${max}`,
    })
    .transform((value) => value || null)
