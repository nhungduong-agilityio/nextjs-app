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
import { Column, Table as TableType } from '@models/component'

const TableComponent: React.FC<TableType> = ({
  columns,
  data,
  type,
  className,
}) => {
  const id = useId()
  return (
    <TableContainer id={id} className={className}>
      <Table variant={type || 'simple'} size="sm">
        <Thead>
          <Tr>
            {columns.map((item: Column) => (
              <Th key={item.name}>{item.name}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              {columns.map((column) => (
                <Td key={column.name}>{item[column.field]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
