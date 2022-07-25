import { NextPage } from 'next'
import Form from '@components/form'
import { getInvoice, getInvoices } from 'apis'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { Invoice } from '@models/invoice'
import { useRouter } from 'next/router'

const EditInvoice: NextPage = () => {
  const { query } = useRouter()
  const { data } = useQuery<Invoice>(['invoice', query.id], () =>
    getInvoice(query.id)
  )
  return <Form item={data} />
}

export default EditInvoice

export async function getStaticPaths() {
  const invoices = await getInvoices()
  return {
    paths: invoices.map((invoice: Invoice) => `/edit/${invoice.id}`) || [],
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
