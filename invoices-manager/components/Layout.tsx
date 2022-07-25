import { Grid, GridItem } from '@chakra-ui/react'
import { Layout } from '@models/component'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { storage } from 'utils'
import Header from './Header'

const Layout: React.FC<Layout> = ({ children }) => {
  const router = useRouter()
  const handleRedirect = () => {
    const userLogin = storage.getToken()
    if (!userLogin) {
      router.push('/login')
    }
  }
  useEffect(() => {
    handleRedirect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid
      templateAreas={`"header header" "main main"`}
      gridTemplateRows={'64px 1fr 56px'}
      gridTemplateColumns={'260px 1fr'}
      h="100vh"
      gap="1"
    >
      <GridItem px="2" area={'header'}>
        <Header />
      </GridItem>
      <GridItem px="5" area={'main'}>
        {children}
      </GridItem>
    </Grid>
  )
}

export default Layout
