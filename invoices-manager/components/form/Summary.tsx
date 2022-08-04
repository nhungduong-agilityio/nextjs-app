import {
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react'
import { memo } from 'react'
import { Form } from '@models/component'
import { calcTotal } from 'utils'

const Summary: React.FC<Form> = ({ data, mode, handleChangeForm }) => {
  const isPreview = mode === 'view'
  const { subtotal, total } = calcTotal(data)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    handleChangeForm!(value, name)
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" py="6">
      <GridItem colSpan={3} pl="6">
        {isPreview ? (
          <Text>
            <strong>Salesperson:</strong> {data.sale || ''}
          </Text>
        ) : (
          <HStack my="3">
            <strong>Salesperson:</strong>{' '}
            <Input
              w="50%"
              onChange={handleChange}
              name="sale"
              value={data.sale}
            />
          </HStack>
        )}

        {isPreview ? (
          <Text>{data.business || 'Thanks for your business'}</Text>
        ) : (
          <Input
            w="50%"
            placeholder="Thanks for your business"
            onChange={handleChange}
            name="business"
            value={data.business}
          />
        )}
      </GridItem>
      <GridItem colSpan={2} pr="6">
        <Flex justifyContent="space-between">
          <Text>Subtotal:</Text>
          <Text as="strong">{`$${subtotal}`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Discount:</Text>
          <Text as="strong">{`$${data.discount}`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Tax:</Text>
          <Text as="strong">{`${data.tax * 100}%`}</Text>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between">
          <Text>Total:</Text>
          <Text as="strong">{`$${total.toFixed(2)}`}</Text>
        </Flex>
      </GridItem>
    </Grid>
  )
}

Summary.defaultProps = {
  mode: 'view',
}

export default memo(Summary)
