import { z } from 'zod'
import { isRequired } from '../model/model'
import { stringValidator } from './rules/stringValidator'
import { integerValidator } from './rules/integerValidator'
import { dateValidator } from './rules/dateValidator'
import { emailValidator } from './rules/emailValidator'
import { DateTime } from 'luxon'

export const schema = z
  .object({})
  .merge(stringValidator('firstName', isRequired('firstName')))
  .merge(stringValidator('lastName', isRequired('lastName')))
  .merge(dateValidator('birthDate', isRequired('birthDate')))
  .merge(integerValidator('age', isRequired('age')))
  .merge(emailValidator('email', isRequired('email')))
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
          message: 'The age and birth date does not match.',
        })
      }
    }
  })

export type Values = z.infer<typeof schema>
