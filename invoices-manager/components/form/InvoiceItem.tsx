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
  Select,
} from '@chakra-ui/react'

import { InvoiceProduct } from '@models/invoice'
import { itemsSelection } from 'constants/invoice'

const InvoiceItem: React.FC<InvoiceProduct> = ({
  product,
  handleUpdateItems,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target
    handleUpdateItems(value, name, product.key!)
  }

  return (
    <>
      <GridItem colSpan={5}>
        <Text as="strong" position="absolute" top="-6">
          Item
        </Text>
        <Select onChange={handleChange} value={product.item} name="item">
          {itemsSelection.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Textarea
          mt="3"
          name="description"
          onChange={handleChange}
          value={product.description}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Text as="strong" position="absolute" top="-6">
          Cost
        </Text>
        <NumberInput
          onChange={(value) =>
            handleUpdateItems(parseInt(value), 'qty', product.key!)
          }
          value={product.qty}
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
          value={product.hours}
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
