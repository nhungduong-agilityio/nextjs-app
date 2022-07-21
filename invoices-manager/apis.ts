const API_URL = 'http://localhost:4000'

const getInvoices = async (offset?: number) =>
  await (await fetch(`${API_URL}/invoices?_page=${offset || 0}`)).json()

const getInvoice = async (id?: string | string[]) =>
  await (await fetch(`${API_URL}/invoices/${id}`)).json()

const getClients = async () => await (await fetch(`${API_URL}/clients`)).json()

export { getInvoices, getInvoice, getClients }
