import { Invoice } from './invoice'

export type Layout = {
  children?: React.ReactNode
}

export interface Column {
  name: string
  field: string
}

export interface Table {
  columns: Array<Column>
  data: Array<Invoice>
  type?: string
}
