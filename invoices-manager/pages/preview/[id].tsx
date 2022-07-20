import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import TableComponent from '../../components/Table'
import { Invoice } from '../../models/invoice'

const Preview: NextPage = () => {
  const { query } = useRouter()
  console.log(query)
  const item = {
    id: 4987,
    issuedDate: '13 May 2022',
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: '23 May 2022',
  }
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={5}>
      <GridItem colSpan={3} boxShadow="base" rounded="md" bg="white">
        <Grid templateColumns="repeat(2, 1fr)" py="6">
          <GridItem pl="6">
            <Heading as="h5" size="sm" mb="6">
              MATERIO
            </Heading>
            <Text>Office 149, 450 South Brand Brooklyn</Text>
            <Text>San Diego County, CA 91905, USA</Text>
            <Text>+1 (123) 456 7891, +44 (876) 543 2198</Text>
          </GridItem>
          <GridItem display="flex" justifyContent="flex-end" pr="6">
            <TableComponent
              columns={[
                {
                  name: 'Invoice',
                  field: 'label',
                },
                {
                  name: `#${item.id}`,
                  field: 'value',
                },
              ]}
              data={
                [
                  {
                    label: 'Date Issued:',
                    value: <Text as="strong">{item.issuedDate}</Text>,
                  },
                  {
                    label: 'Date Due:',
                    value: <Text as="strong">{item.dueDate}</Text>,
                  },
                ] as unknown as Array<Invoice>
              }
              type="unstyled"
            />
          </GridItem>
        </Grid>
        <Divider />
        <Grid templateColumns="repeat(2, 1fr)" py="6">
          <GridItem pl="6">
            <Text as="strong" mb="3">
              Invoice To:
            </Text>
            <Text>{item.name}</Text>
            <Text>{item.company}</Text>
            <Text>{item.address}</Text>
            <Text>{item.contact}</Text>
            <Text>{item.companyEmail}</Text>
          </GridItem>
          <GridItem display="flex" justifyContent="flex-end" pr="6">
            <Box>
              <Text as="strong" mb="3" w="100%">
                Bill To:
              </Text>
              <TableComponent
                columns={[
                  {
                    name: '',
                    field: 'label',
                  },
                  {
                    name: '',
                    field: 'value',
                  },
                ]}
                data={
                  [
                    {
                      label: 'Total Due:',
                      value: <Text as="strong">{item.total}</Text>,
                    },
                    {
                      label: 'Bank name:',
                      value: <Text as="strong">{item.dueDate}</Text>,
                    },
                    {
                      label: 'Country:',
                      value: <Text as="strong">{item.dueDate}</Text>,
                    },
                    {
                      label: 'IBAN:',
                      value: <Text as="strong">{item.dueDate}</Text>,
                    },
                    {
                      label: 'SWIFT code:',
                      value: <Text as="strong">{item.dueDate}</Text>,
                    },
                  ] as unknown as Array<Invoice>
                }
                type="unstyled"
              />
            </Box>
          </GridItem>
        </Grid>
        <TableComponent
          columns={[
            {
              name: 'Item',
              field: 'name',
            },
            {
              name: 'Description',
              field: 'description',
            },
            {
              name: 'hours',
              field: 'hours',
            },
            {
              name: 'qty',
              field: 'qty',
            },
            {
              name: 'Total',
              field: 'total',
            },
          ]}
          data={
            [
              {
                name: 'Total Due:',
                description: 'description',
              },
            ] as unknown as Array<Invoice>
          }
        />
        <Grid templateColumns="repeat(5, 1fr)" py="6">
          <GridItem colSpan={3} pl="6">
            <Text>
              <strong>Salesperson:</strong> Tommy Shelby
            </Text>
            <Text>Thanks for your business</Text>
          </GridItem>
          <GridItem colSpan={2} pr="6">
            <Flex justifyContent="space-between">
              <Text>Subtotal:</Text>
              <Text as="strong">$1800</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Discount:</Text>
              <Text as="strong">$1800</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Tax:</Text>
              <Text as="strong">$1800</Text>
            </Flex>
            <Divider />
            <Flex justifyContent="space-between">
              <Text>Total:</Text>
              <Text as="strong">$1800</Text>
            </Flex>
          </GridItem>
        </Grid>
        <Divider />
        <Text p="6">
          <strong>Note:</strong> It was a pleasure working with you and your
          team. We hope you will keep us in mind for future freelance projects.
          Thank You!
        </Text>
      </GridItem>
      <GridItem colSpan={2} boxShadow="base" p="6" rounded="md" bg="white">
        <Flex direction="column">
          <Button variant="solid">Send Invoice</Button>
          <Button my="3">Edit Invoice</Button>
          <Button variant="solid" bg="green.300">
            Add Payment
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Preview
