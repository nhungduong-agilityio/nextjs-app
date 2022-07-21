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
import TableComponent from '@components/Table'
import { Invoice } from '@models/invoice'
import { useState } from 'react'
import { getInvoices } from 'apis'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import Loading from '@components/Loading'

const Home: NextPage = () => {
  const [offset, setOffset] = useState(1)
  const { data } = useQuery<Array<Invoice>>(['invoices', offset], () =>
    getInvoices(offset)
  )

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

  const handlePrev = () => setOffset(offset - 1)
  const handleNext = () => setOffset(offset + 1)

  const invoices = data
    ? data.map((item) => ({
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
      }))
    : []

  if (!data) return <Loading />

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
        <TableComponent columns={columns} data={invoices} />
        <HStack spacing="2" justifyContent="flex-end">
          <Text>1–10 of 50</Text>
          <IconButton
            icon={<ChevronLeftIcon boxSize={6} />}
            variant="unstyled"
            aria-label="Prev rows"
            disabled={offset === 1}
            onClick={handlePrev}
          />
          <IconButton
            icon={<ChevronRightIcon boxSize={6} />}
            variant="unstyled"
            aria-label="Next rows"
            onClick={handleNext}
          />
        </HStack>
      </Box>
    </>
  )
}

Home.defaultProps = {
  invoices: [],
}

export default Home

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['invoices'], () => getInvoices())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
