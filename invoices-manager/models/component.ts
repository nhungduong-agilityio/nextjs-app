import { Invoice } from './invoice'

export type Layout = {
  children?: React.ReactNode
}

export interface Column {
  name: string
  field: string
}

interface TableData {
  [key: string]: string | React.ReactNode
}

export interface Table {
  columns: Array<Column>
  data: Array<TableData>
  type?: string
  className?: string
}

export interface Form {
  data: Invoice
  mode?: string
}

export interface Client {
  name: string
  address: string
  company: string
  country: string
  contact: string
  companyEmail: string
}
