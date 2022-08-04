import { Invoice } from '@models/invoice'
import { User } from '@models/user'

const API_URL = 'https://invoices-manager-server.herokuapp.com'
const API = (url: string, method?: string, data?: Invoice) => {
  const options = data
    ? {
        body: JSON.stringify(data),
      }
    : {}

  return fetch(`${API_URL}/${url}`, {
    method: method || 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    ...options,
  })
}

const getInvoices = async (offset?: number) =>
  await (await API(`invoices?_page=${offset || 1}`)).json()

const getInvoice = async (id?: string | string[]) =>
  await (await API(`invoices/${id}`)).json()

const getClients = async () => await (await API(`clients`)).json()

const loginWithEmailAndPassword = async (data: User) => {
  const users: Array<User> = await (await API(`users`)).json()

  return users.find((user) => user.email === data.email) || ({} as User)
}
const deleteInvoice = async (id: number) =>
  await API(`invoices/${id}`, 'DELETE')

const createInvoice = async (data: Invoice) =>
  await API(`invoices`, 'POST', data)

const updateInvoice = async (data: Invoice) =>
  await API(`invoices/${data.id}`, 'PUT', data)

export {
  getInvoices,
  getInvoice,
  getClients,
  loginWithEmailAndPassword,
  deleteInvoice,
  createInvoice,
  updateInvoice,
}
