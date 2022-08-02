import { Grid, GridItem, Heading, Input, Text } from '@chakra-ui/react'
import TableComponent from '@components/Table'
import { memo } from 'react'
import { Form } from '@models/component'
import { formatDate } from 'utils'

const Header: React.FC<Form> = ({ data, mode, handleChangeForm }) => {
  const isPreview = mode === 'view'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    handleChangeForm!(value, name)
  }

  const columns = [
    {
      name: 'Invoice',
      field: 'label',
    },
    {
      field: 'value',
      name: <Text as="strong">{`#${data.id || ''}`}</Text>,
    },
  ]

  const tableData = [
    {
      label: 'Date Issued:',
      value: isPreview ? (
        <Text as="strong">{data.issuedDate}</Text>
      ) : (
        <Input
          type="date"
          name="issuedDate"
          onChange={handleChange}
          value={formatDate(data.issuedDate)}
        />
      ),
    },
    {
      label: 'Date Due:',
      value: isPreview ? (
        <Text as="strong">{data.dueDate}</Text>
      ) : (
        <Input
          type="date"
          name="dueDate"
          onChange={handleChange}
          value={formatDate(data.dueDate!)}
        />
      ),
    },
  ]

  return (
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
        <TableComponent columns={columns} data={tableData} type="unstyled" />
      </GridItem>
    </Grid>
  )
}

Header.defaultProps = {
  mode: 'view',
}

export default memo(Header)
