import { Button, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import TableComponent from '@components/Table'
import { Invoice } from '@models/invoice'
import Header from '@components/form/Header'
import InvoiceInfo from '@components/form/InvoiceInfo'
import Summary from '@components/form/Summary'
import Loading from '@components/Loading'
import { getInvoice, getInvoices } from 'apis'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

const Preview: NextPage = () => {
  const { query } = useRouter()
  const { data } = useQuery<Invoice>(['invoice', query.id], () =>
    getInvoice(query.id)
  )
  if (!data) return <Loading />

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={5}>
      <GridItem colSpan={3} boxShadow="base" rounded="md" bg="white">
        <Header data={data} />
        <Divider />
        <InvoiceInfo data={data} />
        <TableComponent
          columns={[
            {
              name: 'Item',
              field: 'item',
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
          data={data.items.map((item) => ({
            ...item,
            total: <Text>{`$${item.total}`}</Text>,
          }))}
        />
        <Summary data={data} />
        <Divider />
        <Text p="6">
          <strong>Note:</strong> It was a pleasure working with you and your
          team. We hope you will keep us in mind for future freelance projects.
          Thank You!
        </Text>
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

export async function getStaticPaths() {
  const invoices = await getInvoices()
  return {
    paths: invoices.map((invoice: Invoice) => `/preview/${invoice.id}`) || [],
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['invoice'], () => getInvoice(params.id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
