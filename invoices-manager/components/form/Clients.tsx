import { Select } from '@chakra-ui/react'
import { Client } from '@models/user'
import { getClients } from 'apis'
import { useQuery } from '@tanstack/react-query'
import { ClientSelection } from '@models/component'

const Clients: React.FC<ClientSelection> = ({
  width,
  handleChangeForm,
  client,
}) => {
  const { data } = useQuery<Array<Client>>(['clients'], getClients)
  const clients = data || []

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeForm!(e.target.value, 'name')
  }

  return (
    <Select w={width} onChange={handleChange} value={client}>
      {clients.map((item) => (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      ))}
    </Select>
  )
}
export default Clients
