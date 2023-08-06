export const isRequired = (
  property: 'firstName' | 'lastName' | 'birthDate' | 'age' | 'email'
) => {
  const requirements = {
    firstName: false,
    lastName: false,
    birthDate: false,
    age: false,
    email: false,
  }
  return requirements[property]
}
