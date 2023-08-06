import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './components/Input'
import { useSchema } from './schemas/useSchema'
import { useEffect } from 'react'
import { isRequired } from './model/model'
import { useTranslation } from 'react-i18next'

function App() {
  const { t: translation } = useTranslation()

  const schema = useSchema(isRequired)
  type Values = z.infer<typeof schema>

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    trigger,
    control,
  } = useForm<Values>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Values) => {
    console.log('🚀 ~ file: App.tsx:17 ~ onSubmit ~ data:', data)
  }

  const birthDate = useWatch({ name: 'birthDate', control })
  const age = useWatch({ name: 'age', control })

  useEffect(() => {
    if (touchedFields.age && touchedFields.birthDate) {
      trigger()
    }
  }, [age, birthDate, touchedFields.age, touchedFields.birthDate, trigger])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/3 grid gap-4 ml-auto mr-auto py-2"
    >
      <Input
        label={translation('first-name', 'First name')}
        type="text"
        error={errors.firstName?.message}
        {...register('firstName')}
      />
      <Input
        label={translation('last-name', 'Last name')}
        type="text"
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <Input
        label={translation('birth-date', 'Birth date')}
        type="date"
        error={errors.birthDate?.message}
        {...register('birthDate')}
      />
      <Input
        label={translation('age', 'Age')}
        type="number"
        error={errors.age?.message}
        {...register('age', { valueAsNumber: true })}
      />
      <Input
        label={translation('email', 'Email')}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <button
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="submit"
      >
        {translation('submit-form', 'Submit form')}
      </button>
    </form>
  )
}

export default App
