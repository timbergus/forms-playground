import { z } from 'zod'
import { useStringValidation } from './rules/useStringValidation'
import { useIntegerValidation } from './rules/useIntegerValidation'
import { useDateValidation } from './rules/useDateValidation'
import { useEmailValidation } from './rules/useEmailValidation'
import { DateTime } from 'luxon'
import { IsRequired } from '../model/model'
import { useTranslation } from 'react-i18next'

export const useSchema = (isRequired: IsRequired) => {
  const { t: translation } = useTranslation()
  return z
    .object({
      firstName: useStringValidation({
        min: 3,
        max: 10,
        isRequired: isRequired('firstName'),
      }),
      lastName: useStringValidation({
        min: 3,
        max: 10,
        isRequired: isRequired('lastName'),
      }),
      birthDate: useDateValidation({
        max: new Date(),
        isRequired: isRequired('birthDate'),
      }),
      age: useIntegerValidation({
        min: 18,
        isRequired: isRequired('age'),
      }),
      email: useEmailValidation({ isRequired: isRequired('email') }),
    })
    .superRefine((value, { addIssue }) => {
      if (value.birthDate && value.age) {
        const birthDate = DateTime.fromISO(value.birthDate)
        const now = DateTime.now()
        const years = Math.floor(
          now.diff(birthDate, ['years']).toObject().years ?? 0
        )
        if (Number(value.age) !== years) {
          addIssue({
            code: z.ZodIssueCode.custom,
            path: ['age'],
            message: translation(
              'age-mismatch',
              'The age and birth date does not match'
            ),
          })
        }
      }
    })
}
