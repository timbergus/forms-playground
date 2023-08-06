import { z } from 'zod'
import { useTranslation } from 'react-i18next'

type EmailValidationHookParams = {
  isRequired: boolean
}

export const useEmailValidation = ({
  isRequired,
}: EmailValidationHookParams) => {
  const { t: translation } = useTranslation()
  return z
    .string()
    .email({
      message: translation('invalid-email', 'This email is invalid'),
    })
    .or(z.literal(''))
    .or(z.literal(null))
    .or(z.literal(undefined))
    .refine((value) => !isRequired || value, {
      message: translation('field-required', 'This field is required'),
    })
    .transform((value) => value || null)
}
