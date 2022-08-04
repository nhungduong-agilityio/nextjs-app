import { Box, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react'
import { ROUTERS } from 'constants/routers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdLogout } from 'react-icons/md'
import { storage } from 'utils'

const Header: React.FC = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push(ROUTERS.LOGIN)
    storage.clearToken()
  }

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" height="100%">
      <Box p="2">
        <Link href={ROUTERS.LIST}>
          <Heading size="md" as="a">
            Materio - Invoices Manager
          </Heading>
        </Link>
      </Box>
      <Spacer />
      {router.pathname !== ROUTERS.LOGIN && (
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
