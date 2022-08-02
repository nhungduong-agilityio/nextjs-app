import { Invoice } from '@models/invoice'
import { User } from '@models/user'

const API_URL = 'https://invoices-manager-server.herokuapp.com'

const getInvoices = async (offset?: number) =>
  await (await fetch(`${API_URL}/invoices?_page=${offset || 1}`)).json()

const getInvoice = async (id?: string | string[]) =>
  await (await fetch(`${API_URL}/invoices/${id}`)).json()

const getClients = async () => await (await fetch(`${API_URL}/clients`)).json()

const loginWithEmailAndPassword = async (data: User) => {
  const users: Array<User> = await (await fetch(`${API_URL}/users`)).json()

  return users.find((user) => user.email === data.email) || ({} as User)
}
const deleteInvoice = async (id: number) =>
  await fetch(`${API_URL}/invoices/${id}`, {
    method: 'DELETE',
  })

const createInvoice = async (data: Invoice) =>
  await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  })

const updateInvoice = async (data: Invoice) =>
  await fetch(`${API_URL}/invoices/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  })

export {
  getInvoices,
  getInvoice,
  getClients,
  loginWithEmailAndPassword,
  deleteInvoice,
  createInvoice,
  updateInvoice,
}
