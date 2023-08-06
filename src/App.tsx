import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './components/Input'
import { useSchema } from './schemas/useSchema'
import { useEffect } from 'react'
import { isRequired } from './model/model'

function App() {
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
        label="First name"
        type="text"
        error={errors.firstName?.message}
        {...register('firstName')}
      />
      <Input
        label="Last name"
        type="text"
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <Input
        label="Date of birth"
        type="date"
        error={errors.birthDate?.message}
        {...register('birthDate')}
      />
      <Input
        label="Age"
        type="number"
        error={errors.age?.message}
        {...register('age', { valueAsNumber: true })}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default App
