export interface InvoiceItemType {
  item: string
  description: string
  hours: number
  qty: number
  total: number
  key?: number
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
  items: InvoiceItemType[]
  business?: string
  sale?: string
  description?: string
}

export interface InvoiceProduct {
  product: InvoiceItemType
  handleUpdateItems: (value: number | string, name: string, key: number) => void
}

export interface InvoiceItems {
  items: InvoiceItemType[]
  handleChangeForm: (value: string | InvoiceItemType[], name: string) => void
}
