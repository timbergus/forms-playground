import { z } from 'zod'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

type DateValidationHookParams = {
  min?: Date
  max?: Date
  isRequired: boolean
}

export const useDateValidation = ({
  min,
  max,
  isRequired,
}: DateValidationHookParams) => {
  const { t: translation } = useTranslation()
  return z
    .string()
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired || value, {
      message: translation('field-required', 'This field is required'),
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
        message: translation(
          'date-too-early',
          'The date must be after {{date}}',
          { date: DateTime.fromJSDate(min!).toFormat('dd-MM-yyyy') }
        ),
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
        message: translation(
          'date-too-late',
          'The date must be before {{date}}',
          { date: DateTime.fromJSDate(max!).toFormat('dd-MM-yyyy') }
        ),
      }
    )
    .transform((value) => (value ? new Date(value).toISOString() : null))
}
