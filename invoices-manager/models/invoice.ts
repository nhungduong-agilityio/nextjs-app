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
}
