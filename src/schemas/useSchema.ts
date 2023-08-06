import { z } from 'zod'
import { stringValidator } from './rules/stringValidator'
import { integerValidator } from './rules/integerValidator'
import { dateValidator } from './rules/dateValidator'
import { emailValidator } from './rules/emailValidator'
import { DateTime } from 'luxon'
import { IsRequired } from '../model/model'

export const useSchema = (isRequired: IsRequired) =>
  z
    .object({
      firstName: stringValidator(isRequired('firstName')),
      lastName: stringValidator(isRequired('lastName')),
      birthDate: dateValidator(isRequired('birthDate')),
      age: integerValidator(isRequired('age')),
      email: emailValidator(isRequired('email')),
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
            message: 'The age and birth date does not match.',
          })
        }
      }
    })
