import { Invoice, InvoiceItemType } from './invoice'

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
  handleChangeForm?: (
    value: string | InvoiceItemType[],
    name: string,
    total?: number
  ) => void
}

export interface ClientSelection {
  width?: string | number
  handleChangeForm?: (value: string | InvoiceItemType[], name: string) => void
  client?: string
}
