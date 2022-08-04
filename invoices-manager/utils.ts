import { Invoice } from '@models/invoice'
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

export const formatDate = (date: string) => {
  const currentDate = new Date(date)
  let month = `${currentDate.getMonth() + 1}`
  let day = `${currentDate.getDate()}`
  const year = currentDate.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}

export const calcTotal = (data: Invoice) => {
  const items = data.items || []
  const subtotal = items.reduce((a, b) => a + (b.total || 0), 0)
  const total = (subtotal + data.discount) * (1 + data.tax) || 0

  return {
    subtotal,
    total,
  }
}
