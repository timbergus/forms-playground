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
    .refine(
      (value) => {
        if (min && value && value < min) {
          return false
        }
        return true
      },
      {
        message: `It has to be greater or equal than ${min}`,
      }
    )
    .refine(
      (value) => {
        if (max && value && value > max) {
          return false
        }
        return true
      },
      {
        message: `It has to be smaller or equal than ${max}`,
      }
    )
    .transform((value) => value || null)
