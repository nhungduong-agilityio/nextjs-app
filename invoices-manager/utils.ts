import { User } from '@models/user'
import { PATTERN } from 'constants/pattern'

export const storage = {
  getToken: () => {
    const token = localStorage.getItem('token')
    return token ? JSON.parse(token) : ''
  },
  setToken: (token: string) =>
    localStorage.setItem('token', JSON.stringify(token)),
  clearToken: () => localStorage.removeItem('token'),
}

export const loginValidator = {
  isValid: true,
  messages: {
    email: '',
    password: '',
  },
}

export const validateLogin = (
  user: User,
  fields: { [Property in keyof User]: Array<string> }
) => {
  const validate = { ...loginValidator }
  Object.keys(fields).forEach((field) => {
    const value = user[field as keyof User]
    fields[field as keyof User].forEach((key) => {
      switch (key) {
        case 'required': {
          if (!value) {
            validate.isValid = false
            validate.messages[field as keyof User] = 'Required'
          } else {
            validate.isValid = true
            validate.messages[field as keyof User] = ''
          }

          break
        }

        case 'email': {
          if (value && !value.match(PATTERN.EMAIL)) {
            validate.isValid = false
            validate.messages[field as keyof User] = 'Email is not valid'
          }

          break
        }

        case 'password': {
          if (value && !value.match(PATTERN.PASSWORD)) {
            validate.isValid = false
            validate.messages[field as keyof User] = 'Password is not valid'
          }

          break
        }

        default:
          break
      }
    })
  })

  return validate
}
