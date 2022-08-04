import { Invoice, InvoiceItemType } from '@models/invoice'
import { useState } from 'react'

export const useForm = ({ initialState }: { initialState: Invoice }) => {
  const [formState, setFormState] = useState(initialState)

  const handleChangeForm = (
    value: string | InvoiceItemType[],
    field: string
  ) => {
    setFormState({
      ...formState,
      [field]: value,
    })
  }

  return {
    formState,
    handleChangeForm,
  }
}
