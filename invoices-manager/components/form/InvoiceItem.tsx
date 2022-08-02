import React from 'react'
import {
  GridItem,
  NumberInput,
  Text,
  Textarea,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { InvoiceItem } from '@models/invoice'
import Clients from './Clients'

const InvoiceItem: React.FC<{
  product: InvoiceItem
  handleChangeForm: (value: string | InvoiceItem[], name: string) => void
  handleUpdateItems: (value: number | string, name: string, key: string) => void
}> = ({ product, handleChangeForm, handleUpdateItems }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    handleUpdateItems(value, name, product.key!)
  }

  return (
    <>
      <GridItem colSpan={5}>
        <Text as="strong" position="absolute" top="-6">
          Item
        </Text>
        <Clients handleChangeForm={handleChangeForm} />
        <Textarea mt="3" name="description" onChange={handleChange} />
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="strong" position="absolute" top="-6">
          Cost
        </Text>
        <NumberInput
          onChange={(value) =>
            handleUpdateItems(parseInt(value), 'qty', product.key!)
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="strong" position="absolute" top="-6">
          Hours
        </Text>
        <NumberInput
          onChange={(value) =>
            handleUpdateItems(parseInt(value), 'hours', product.key!)
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="strong" position="absolute" top="-6">
          Price
        </Text>
        <Text>{`$${product.total}`}</Text>
      </GridItem>
    </>
  )
}

export default InvoiceItem
