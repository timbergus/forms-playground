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
  .merge(dateValidator('dateOfBirth', isRequired('dateOfBirth')))
  .merge(integerValidator('age', isRequired('age')))
  .merge(emailValidator('email', isRequired('email')))
  .superRefine((value, { addIssue }) => {
    if (value.dateOfBirth && value.age) {
      const dateOfBirth = DateTime.fromISO(value.dateOfBirth)
      const now = DateTime.now()
      const years = Math.floor(
        now.diff(dateOfBirth, ['years']).toObject().years ?? 0
      )
      console.log('🚀 ~ file: schema.ts:24 ~ .superRefine ~ years:', years)

      if (Number(value.age) !== years) {
        addIssue({
          code: z.ZodIssueCode.custom,
          path: ['age'],
          message: 'Please, set a correct age or a correct birth date.',
        })
      }
    }
  })

export type Values = z.infer<typeof schema>
