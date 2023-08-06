import { z } from 'zod'
import { useTranslation } from 'react-i18next'

type StringValidationHookParams = {
  min?: number
  max?: number
  isRequired: boolean
}

export const useStringValidation = ({
  min,
  max,
  isRequired,
}: StringValidationHookParams) => {
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
        if (min && value && value.length < min) {
          return false
        }
        return true
      },
      {
        message: translation(
          'field-too-small',
          'This field has to be greater or equal than {{min}}',
          { min }
        ),
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
        message: translation(
          'field-too-big',
          'This field has to be smaller or equal than {{max}}',
          { max }
        ),
      }
    )
    .transform((value) => value || null)
}
