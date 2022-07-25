import React, { Fragment } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  NumberInput,
  Stat,
  StatHelpText,
  StatLabel,
  Text,
  Textarea,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  CloseButton,
} from '@chakra-ui/react'

import { Invoice, InvoiceItem } from '@models/invoice'
import Header from '@components/form/Header'
import InvoiceInfo from '@components/form/InvoiceInfo'
import Summary from '@components/form/Summary'
import Clients from './Clients'

const Form: React.FC<{ item?: Invoice }> = ({ item }) => {
  const invoice = item || ({} as Invoice)
  const mode = invoice.id ? 'edit' : 'add'
  const items = invoice.items || []
  return (
    <form>
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        <GridItem colSpan={3} boxShadow="base" rounded="md" bg="white">
          <Header data={invoice} mode={mode} />
          <Divider />
          <InvoiceInfo data={invoice} mode={mode} />

          <Box px="6">
            {items.map((product: InvoiceItem) => (
              <Fragment key={product.item}>
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
                  <GridItem colSpan={5}>
                    <Text as="strong" position="absolute" top="-6">
                      Item
                    </Text>
                    <Clients />
                    <Textarea mt="3" />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Text as="strong" position="absolute" top="-6">
                      Cost
                    </Text>
                    <NumberInput>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Stat mt="3">
                      <StatLabel>Discount:</StatLabel>
                      <StatHelpText>0% 0% 0%</StatHelpText>
                    </Stat>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Text as="strong" position="absolute" top="-6">
                      Hours
                    </Text>
                    <NumberInput>
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
                  <GridItem colSpan={1} borderLeft="1px" borderColor="gray.100">
                    <CloseButton />
                  </GridItem>
                </Grid>
              </Fragment>
            ))}
            <Button variant="solid" size="xs" mt="3">
              Add Item
            </Button>
          </Box>

          <Summary data={invoice} />
          <Divider />
          <Box p="6">
            <Text as="strong">Note:</Text>
            <Textarea mt="3" />
          </Box>
        </GridItem>
        <GridItem
          colSpan={2}
          boxShadow="base"
          p="6"
          rounded="md"
          bg="white"
          h="max-content"
        >
          <Flex direction="column">
            <Button variant="solid">Send Invoice</Button>
            <Button my="3">Preview</Button>
            <Button my="3">Save</Button>
            <Button variant="solid" bg="green.300">
              Add Payment
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </form>
  )
}

export default Form
