import React, { Fragment } from 'react'
import { Box, Button, Grid, GridItem, CloseButton } from '@chakra-ui/react'

import { InvoiceItem as InvoiceItemType } from '@models/invoice'
import { defaultItem } from 'constants/invoice'
import InvoiceItem from './InvoiceItem'

const Items: React.FC<{
  items: InvoiceItemType[]
  handleChangeForm: (value: string | InvoiceItemType[], name: string) => void
}> = ({ items, handleChangeForm }) => {
  const len = items.length + 1
  const handleAddItem = () => {
    const list = [...items]
    list.push({
      ...defaultItem,
      key: `item-${len}`,
    })
    handleChangeForm(list, 'items')
  }

  const handleRemoveItem = (idx: string) => {
    const list = [...items]
    const newList = list.filter((item) => item.key !== idx)

    handleChangeForm(newList, 'items')
  }

  const handleUpdateItems = (
    value: number | string,
    name: string,
    key: string
  ) => {
    const list = [...items]
    const idx = list.findIndex((product) => product.key === key)

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
      {items.map((product: InvoiceItemType) => (
        <Fragment key={product.key}>
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
              product={product}
              handleChangeForm={handleChangeForm}
              handleUpdateItems={handleUpdateItems}
            />
            <GridItem colSpan={1} borderLeft="1px" borderColor="gray.100">
              <CloseButton onClick={() => handleRemoveItem(product.key!)} />
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
