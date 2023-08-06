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
      firstName: stringValidator({
        min: 3,
        max: 10,
        isRequired: isRequired('firstName'),
      }),
      lastName: stringValidator({
        min: 3,
        max: 10,
        isRequired: isRequired('lastName'),
      }),
      birthDate: dateValidator({
        max: new Date(),
        isRequired: isRequired('birthDate'),
      }),
      age: integerValidator({
        min: 18,
        max: 30,
        isRequired: isRequired('age'),
      }),
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
