import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import TableComponent from '../components/Table'
import { Invoice } from '../models/invoice'

const Home: NextPage = () => {
  const columns = [
    {
      name: '#',
      field: 'id',
    },
    {
      name: 'Client',
      field: 'client',
    },
    {
      name: 'Total',
      field: 'total',
    },
    {
      name: 'Issued date',
      field: 'issuedDate',
    },
    {
      name: 'Balance',
      field: 'balance',
    },
    {
      name: 'Actions',
      field: 'actions',
    },
  ]

  const status = [
    'none',
    'Downloaded',
    'Draff',
    'Paid',
    'Past Due',
    'Partial Payment',
  ]

  const data = [
    {
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
    },
    {
      id: 4988,
      issuedDate: '17 May 2022',
      address: '04033 Wesley Wall Apt. 961',
      company: 'Mccann LLC and Sons',
      companyEmail: 'brenda49@taylor.info',
      country: 'Haiti',
      contact: '(226) 204-8287',
      name: 'Stephanie Burns',
      service: 'UI/UX Design & Development',
      total: 5219,
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: '15 May 2022',
    },
  ].map((item) => ({
    id: <Link href={`/preview/${item.id}`}>{`#${item.id}`}</Link>,
    client: (
      <HStack spacing={2}>
        <Avatar name={item.name} src={'https://bit.ly/broken-link'} />
        <VStack spacing={1} alignItems="flex-start">
          <Text as="strong">{item.name}</Text>
          <Text fontSize="xs">{item.companyEmail}</Text>
        </VStack>
      </HStack>
    ),
    total: <Text>{`$${item.total}`}</Text>,
    issuedDate: item.issuedDate,
    balance: item.balance || (
      <Badge colorScheme="green" rounded="10" px="2">
        Paid
      </Badge>
    ),
    actions: (
      <HStack spacing={3}>
        <IconButton
          variant="unstyled"
          aria-label="Delete invoice"
          icon={<DeleteIcon />}
        />
        <IconButton
          variant="unstyled"
          aria-label="View invoice"
          icon={<ViewIcon />}
        />
        <IconButton
          variant="unstyled"
          aria-label="Edit invoice"
          icon={<EditIcon />}
        />
      </HStack>
    ),
  })) as unknown as Array<Invoice>

  return (
    <>
      <Box boxShadow="base" p="6" rounded="md" bg="white" mb="6">
        <Heading as="h5" size="sm">
          Filters
        </Heading>
        <HStack spacing={5} mt="4">
          <Select placeholder="Invoice Status" w="50%">
            {status.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Box w="50%">
            <Input placeholder="Invoice Date" />
          </Box>
        </HStack>
      </Box>
      <Box boxShadow="base" p="6" rounded="md" bg="white">
        <HStack spacing="2" justifyContent="flex-end" mb={5}>
          <Input htmlSize={24} width="auto" placeholder="Search Invoice" />
          <Button variant="solid">Create Invoice</Button>
        </HStack>
        <TableComponent columns={columns} data={data} />
        <HStack spacing="2" justifyContent="flex-end">
          <Text>1–10 of 50</Text>
          <IconButton
            icon={<ChevronLeftIcon boxSize={6} />}
            variant="unstyled"
            aria-label="Prev rows"
          />
          <IconButton
            icon={<ChevronRightIcon boxSize={6} />}
            variant="unstyled"
            aria-label="Next rows"
          />
        </HStack>
      </Box>
    </>
  )
}

export default Home
