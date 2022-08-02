import { Invoice, InvoiceItem } from './invoice'

export type Layout = {
  children?: React.ReactNode
}

export interface Column {
  name: string | React.ReactNode
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
  handleChangeForm?: (value: string | InvoiceItem[], name: string) => void
}

export interface ClientSelection {
  width?: string | number
  handleChangeForm?: (value: string | InvoiceItem[], name: string) => void
}
