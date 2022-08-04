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
  useToast,
  VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import TableComponent from '@components/Table'
import { Invoice } from '@models/invoice'
import { useState, useTransition } from 'react'
import { deleteInvoice, getInvoices } from 'apis'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Loading from '@components/Loading'
import { columns } from 'constants/columns'
import { status } from 'constants/invoice'
import { ROUTERS } from 'constants/routers'

const Home: NextPage = () => {
  const [offset, setOffset] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState('')
  const [, startTransition] = useTransition()
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data } = useQuery<Array<Invoice>>(['invoices', offset], () =>
    getInvoices(offset)
  )
  const handlePrev = () => setOffset(offset - 1)
  const handleNext = () => setOffset(offset + 1)

  const mutation = useMutation(deleteInvoice, {
    onSuccess: () => {
      toast({
        title: 'Delete invoice success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      queryClient.invalidateQueries(['invoices', offset])
    },
  })

  const handleDeleteInvoice = (id: number) => mutation.mutate(id)

  const handleSearch = (e: { target: { value: string } }) => {
    const value = e.target.value.trim()
    setQuery(value)

    startTransition(() => {
      setInputValue(value)
    })
  }

  const displayData = query
    ? data!.filter((item) => item.id.toString().includes(query))
    : data

  if (!data) return <Loading />

  const invoices = displayData
    ? displayData.map((item) => ({
        id: <Link href={`${ROUTERS.PREVIEW}/${item.id}`}>{`#${item.id}`}</Link>,
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
              onClick={() => handleDeleteInvoice(item.id)}
            />
            <Link href={`${ROUTERS.PREVIEW}/${item.id}`}>
              <IconButton
                variant="unstyled"
                aria-label="View invoice"
                icon={<ViewIcon />}
              />
            </Link>
            <Link href={`${ROUTERS.EDIT_INVOICE}/${item.id}`}>
              <IconButton
                variant="unstyled"
                aria-label="Edit invoice"
                icon={<EditIcon />}
              />
            </Link>
          </HStack>
        ),
      }))
    : []

  const isLastPage = invoices.length < 10

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
          <Input
            htmlSize={24}
            width="auto"
            placeholder="Search Invoice"
            onChange={handleSearch}
            value={inputValue}
          />
          <Link href={ROUTERS.ADD_INVOICE}>
            <Button as="a" variant="solid">
              Create Invoice
            </Button>
          </Link>
        </HStack>
        <TableComponent columns={columns.invoices} data={invoices} />
        <HStack spacing="2" justifyContent="flex-end">
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
            disabled={isLastPage}
          />
        </HStack>
      </Box>
    </>
  )
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
