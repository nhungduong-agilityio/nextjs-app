import React from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  NumberInput,
  Select,
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

import { Invoice } from '@models/invoice'
import Header from '@components/form/Header'
import InvoiceInfo from '@components/form/InvoiceInfo'
import Summary from '@components/form/Summary'

const Form: React.FC = () => {
  const item = {} as Invoice
  const clients = [
    {
      name: 'Jodan Stevenson',
      id: '1',
    },
  ]
  return (
    <form>
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        <GridItem colSpan={3} boxShadow="base" rounded="md" bg="white">
          <Header data={item} />
          <Divider />
          <InvoiceInfo data={item} />
          <Box px="6">
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={8}
              rounded="5"
              border="1px"
              borderColor="gray.100"
              p="3"
              position="relative"
            >
              <GridItem colSpan={5}>
                <Text as="strong" position="absolute" top="-6">
                  Item
                </Text>
                <Select mb="3">
                  {clients.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                <Textarea />
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
                <Text>buhabdg</Text>
              </GridItem>
              <GridItem colSpan={1} borderLeft="1px" borderColor="gray.100">
                <CloseButton />
              </GridItem>
            </Grid>
            <Button variant="solid" size="xs" mt="3">
              Add Item
            </Button>
          </Box>

          <Summary data={item} />
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
