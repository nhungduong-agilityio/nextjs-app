import React, { Fragment } from 'react'
import { Box, Button, Grid, GridItem, CloseButton } from '@chakra-ui/react'

import { InvoiceItemType, InvoiceItems } from '@models/invoice'
import { defaultItem } from 'constants/invoice'
import InvoiceItem from './InvoiceItem'

const Items: React.FC<InvoiceItems> = ({ items, handleChangeForm }) => {
  const handleAddItem = () => {
    const list = [...items]
    list.push(defaultItem)
    handleChangeForm(list, 'items')
  }

  const handleRemoveItem = (idx: number) => {
    const list = [...items]
    const newList = list.filter((item, index) => index !== idx)

    handleChangeForm(newList, 'items')
  }

  const handleUpdateItems = (
    value: number | string,
    name: string,
    key: number
  ) => {
    const list = [...items]
    const idx = list.findIndex((product, index) => index === key)

    if (idx >= 0) {
      const currentValue = {
        ...list[idx],
        [name]: value,
      }
      list[idx] = {
        ...currentValue,
        total: currentValue.qty * currentValue.hours,
      }

      handleChangeForm(list, 'items')
    }
  }

  return (
    <Box px="6">
      {items.map((product: InvoiceItemType, index: number) => (
        <Fragment key={`item-${index + 1}`}>
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={8}
            rounded="5"
            border="1px"
            borderColor="gray.100"
            p="3"
            position="relative"
            mt="8"
          >
            <InvoiceItem
              product={{ ...product, key: index }}
              handleUpdateItems={handleUpdateItems}
            />
            <GridItem colSpan={1} borderLeft="1px" borderColor="gray.100">
              <CloseButton onClick={() => handleRemoveItem(index)} />
            </GridItem>
          </Grid>
        </Fragment>
      ))}
      <Button variant="solid" size="xs" mt="3" onClick={handleAddItem}>
        Add Item
      </Button>
    </Box>
  )
}

export default Items
