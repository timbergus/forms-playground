import i18n from 'i18next'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initReactI18next } from 'react-i18next'

import App from './App.tsx'

import './index.css'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          'field-required': 'This field is required',
          'submit-form': 'Submit',
          'age-mismatch': 'The age and birth date does not match',
          'invalid-email': 'This email is invalid',
          'field-too-big': 'This field has to be smaller or equal than {{max}}',
          'field-too-small':
            'This field has to be greater or equal than {{min}}',
          'date-too-early': 'The date must be before {{date}}',
          'date-too-late': 'The date must be after {{date}}',
          'first-name': 'First name',
          'last-name': 'Last name',
          'birth-date': 'Birth data',
          age: 'Age',
          email: 'Email',
        },
      },
      es: {
        translation: {
          'field-required': 'El campo es requerido',
          'submit-form': 'Submit',
          'age-mismatch': 'La edad y la fecha de cumpleaños no coinciden',
          'invalid-email': 'El correo electrónico no es válido',
          'field-too-big': 'Este campo debe ser menor o igual que {{max}}',
          'field-too-small': 'Este campo debe ser mayor o igual que {{min}}',
          'date-too-early': 'La fecha debe ser posterior al {{date}}',
          'date-too-late': 'la fecha debe ser anterior al {{date}}',
          'first-name': 'Nombre',
          'last-name': 'Apellido',
          'birth-date': 'Fecha de nacimiento',
          age: 'Edad',
          email: 'Correo electrónico',
        },
      },
    },
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
