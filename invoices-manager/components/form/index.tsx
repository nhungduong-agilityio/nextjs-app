import React, { useId } from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'

import { Invoice } from '@models/invoice'
import Header from '@components/form/Header'
import InvoiceInfo from '@components/form/InvoiceInfo'
import Summary from '@components/form/Summary'
import { defaultInvoice } from 'constants/invoice'
import Items from './Items'
import { useMutation } from '@tanstack/react-query'
import { createInvoice, updateInvoice } from 'apis'
import { useForm } from 'hooks'
import { useRouter } from 'next/router'
import { ROUTERS } from 'constants/routers'
import Link from 'next/link'
import { calcTotal } from 'utils'

const Form: React.FC<{ item?: Invoice; mode: string }> = ({ item, mode }) => {
  const id = useId()
  const toast = useToast()

  const router = useRouter()
  const isEdit = mode === 'edit'

  const mutation = useMutation(isEdit ? updateInvoice : createInvoice, {
    onSuccess: () => {
      toast({
        title: `${isEdit ? 'Edit' : 'Create'} invoice success`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      router.push(ROUTERS.LIST)
    },
  })

  const { handleChangeForm, formState: invoice } = useForm({
    initialState: item || (defaultInvoice as Invoice),
  })

  const handleSubmit = () => {
    const { total } = calcTotal(invoice)
    return mutation.mutate({ ...invoice, total })
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    handleChangeForm!(value, name)
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={5} id={id}>
      <GridItem colSpan={3} boxShadow="base" rounded="md" bg="white">
        <Header
          data={invoice}
          mode={mode}
          handleChangeForm={handleChangeForm}
        />
        <Divider />
        <InvoiceInfo
          data={invoice}
          mode={mode}
          handleChangeForm={handleChangeForm}
        />
        <Items items={invoice.items} handleChangeForm={handleChangeForm} />
        <Summary
          data={invoice}
          mode={mode}
          handleChangeForm={handleChangeForm}
        />
        <Divider />
        <Box p="6">
          <Text as="strong">Note:</Text>
          <Textarea
            mt="3"
            name="description"
            onChange={handleChange}
            value={invoice.description}
          />
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
          {isEdit && (
            <Link href={`${ROUTERS.PREVIEW}/${invoice.id}`}>
              <Button as="a" variant="solid" my="3">
                Preview
              </Button>
            </Link>
          )}
          <Button my="3" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="solid" bg="green.300">
            Add Payment
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Form
