import { Invoice } from '@models/invoice'
import { User } from '@models/user'

const API_URL = 'http://localhost:4000'

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
    method: 'delete',
  })

const createInvoice = async (data: Invoice) =>
  await fetch(`${API_URL}/invoices`, {
    method: 'post',
    body: JSON.stringify(data),
  })

const updateInvoice = async (data: Invoice) =>
  await fetch(`${API_URL}/invoicesi/${data.id}`, {
    method: 'put',
    body: JSON.stringify(data),
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
