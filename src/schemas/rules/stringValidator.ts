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
      (value) => (isRequired ? min && (value?.length ?? 0) >= min : true),
      {
        message: `It has to be longer or equal to ${min}`,
      }
    )
    .refine(
      (value) => (isRequired ? max && (value?.length ?? 0) <= max : true),
      {
        message: `It has to be sorter or equal to ${max}`,
      }
    )
    .transform((value) => value || null)
