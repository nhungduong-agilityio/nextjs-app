import { Select } from '@chakra-ui/react'
import { Client } from '@models/component'
import { getClients } from 'apis'
import { useQuery } from '@tanstack/react-query'

const Clients: React.FC<{ width?: string | number }> = ({ width }) => {
  const { data: clients } = useQuery<Array<Client>>(['clients'], getClients)
  return (
    <Select w={width}>
      {clients?.map((item) => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </Select>
  )
}
export default Clients
