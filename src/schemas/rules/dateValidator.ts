import { z } from 'zod'
import { DateTime } from 'luxon'

type DateValidator = {
  min?: Date
  max?: Date
  isRequired: boolean
}

export const dateValidator = ({ min, max, isRequired }: DateValidator) =>
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
        if (value && min) {
          const date = DateTime.fromISO(value)
          return DateTime.fromJSDate(min).diff(date).milliseconds <= 0
        }
        return true
      },
      {
        message: `the date must be after ${DateTime.fromJSDate(min!).toFormat(
          'dd-MM-yyyy'
        )}`,
      }
    )
    .refine(
      (value) => {
        if (value && max) {
          const date = DateTime.fromISO(value)
          return DateTime.fromJSDate(max).diff(date).milliseconds >= 0
        }
        return true
      },
      {
        message: `the date must be before ${DateTime.fromJSDate(max!).toFormat(
          'dd-MM-yyyy'
        )}`,
      }
    )
    .transform((value) => (value ? new Date(value).toISOString() : null))
