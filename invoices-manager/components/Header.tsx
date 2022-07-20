import { Box, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { MdLogout } from 'react-icons/md'

const Header: React.FC = () => {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" height="100%">
      <Box p="2">
        <Link href={'/'}>
          <Heading size="md">Materio - Invoices Manager</Heading>
        </Link>
      </Box>
      <Spacer />
      <IconButton
        aria-label="logout"
        icon={<MdLogout />}
        title="Logout"
        variant="outline"
      />
    </Flex>
  )
}

export default Header
