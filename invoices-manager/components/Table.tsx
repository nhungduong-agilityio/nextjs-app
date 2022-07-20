import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useId,
} from '@chakra-ui/react'
import { Column, Table as TableType } from '../models/component'
import { Invoice } from '../models/invoice'

const TableComponent: React.FC<TableType> = ({ columns, data, type }) => {
  const id = useId()
  return (
    <TableContainer id={id}>
      <Table variant={type || 'simple'} size="sm">
        <Thead>
          <Tr>
            {columns.map((item: Column) => (
              <Th key={item.name}>{item.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item: Invoice) => (
            <Tr key={item.name}>
              {columns.map((column) => (
                <Td key={column.name}>{item[column.field as keyof Invoice]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
