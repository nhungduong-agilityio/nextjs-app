import { Box, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdLogout } from 'react-icons/md'
import { storage } from 'utils'

const Header: React.FC = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
    storage.clearToken()
  }

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" height="100%">
      <Box p="2">
        <Link href={'/'}>
          <Heading size="md">Materio - Invoices Manager</Heading>
        </Link>
      </Box>
      <Spacer />
      {router.pathname !== '/login' && (
        <IconButton
          aria-label="logout"
          icon={<MdLogout />}
          title="Logout"
          variant="outline"
          onClick={handleLogout}
        />
      )}
    </Flex>
  )
}

export default Header
