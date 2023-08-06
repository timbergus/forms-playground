import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './components/Input'
import { Values, schema } from './schemas/schema'

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Values) => {
    console.log('🚀 ~ file: App.tsx:17 ~ onSubmit ~ data:', data)
  }

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
        error={errors.dateOfBirth?.message}
        {...register('dateOfBirth')}
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
