export interface InvoiceItem {
  item: string
  description: string
  hours: number
  qty: number
  total: number
  key?: string
}

export interface Invoice {
  id: number
  issuedDate: string
  address?: string
  company?: string
  companyEmail?: string
  country?: string
  contact?: string
  name?: string
  service?: string
  total: number
  avatarColor?: string
  invoiceStatus?: string
  balance: string | number
  dueDate?: string
  discount: number
  tax: number
  items: InvoiceItem[]
  business?: string
  sale?: string
  description?: string
}
