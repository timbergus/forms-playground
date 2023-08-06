export const isRequired = (
  property: 'firstName' | 'lastName' | 'birthDate' | 'age' | 'email'
) => {
  const requirements = {
    firstName: true,
    lastName: true,
    birthDate: true,
    age: true,
    email: true,
  }
  return requirements[property]
}

export type IsRequired = typeof isRequired
