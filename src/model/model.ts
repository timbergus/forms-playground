export const isRequired = (
  property: 'firstName' | 'lastName' | 'dateOfBirth' | 'age' | 'email'
) => {
  const requirements = {
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    age: false,
    email: false,
  }
  return requirements[property]
}
