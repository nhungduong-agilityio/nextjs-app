import { Grid, GridItem } from '@chakra-ui/react'
import { Layout } from '@models/component'
import Header from './Header'

const Layout: React.FC<Layout> = ({ children }) => {
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
