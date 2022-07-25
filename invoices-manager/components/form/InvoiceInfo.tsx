import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import TableComponent from '@components/Table'
import { memo } from 'react'
import { Form } from '@models/component'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getClients } from 'apis'
import Clients from './Clients'

const InvoiceInfo: React.FC<Form> = ({ data, mode }) => {
  const isPreview = mode === 'view'

  return (
    <Grid templateColumns="repeat(2, 1fr)" py="6">
      <GridItem pl="6" className="invoice-info">
        <Text as="strong">Invoice To:</Text>
        {isPreview ? (
          <Text>{data.name}</Text>
        ) : (
          <Box my="3">
            <Clients width="50%" />
          </Box>
        )}
        <Text>{data.company}</Text>
        <Text>{data.address}</Text>
        <Text>{data.contact}</Text>
        <Text>{data.companyEmail}</Text>
      </GridItem>
      <GridItem display="flex" justifyContent="flex-end" pr="6">
        <Box>
          <Text as="strong" w="100%">
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
            data={[
              {
                label: 'Total Due:',
                value: '$12,110.55',
              },
              {
                label: 'Bank name:',
                value: 'American Bank',
              },
              {
                label: 'Country:',
                value: 'United States',
              },
              {
                label: 'IBAN:',
                value: 'ETD95476213874685',
              },
              {
                label: 'SWIFT code:',
                value: 'BR91905',
              },
            ]}
            type="unstyled"
            className="invoice-bill"
          />
        </Box>
      </GridItem>
    </Grid>
  )
}

InvoiceInfo.defaultProps = {
  mode: 'view',
}

export default memo(InvoiceInfo)

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['clients'], getClients)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
