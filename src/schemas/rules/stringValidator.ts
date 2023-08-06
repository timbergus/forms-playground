import { z } from 'zod'

type StringValidator = {
  min?: number
  max?: number
  isRequired: boolean
}

export const stringValidator = ({ min, max, isRequired }: StringValidator) =>
  z
    .string()
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired || value, {
      message: 'This field is required',
    })
    .refine(
      (value) => {
        if (min && value && value.length < min) {
          return false
        }
        return true
      },
      {
        message: `It has to be longer or equal than ${min}`,
      }
    )
    .refine(
      (value) => {
        if (max && value && value.length > max) {
          return false
        }
        return true
      },
      {
        message: `It has to be sorter or equal than ${max}`,
      }
    )
    .transform((value) => value || null)
