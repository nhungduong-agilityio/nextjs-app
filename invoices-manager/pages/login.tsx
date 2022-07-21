import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'

const Login: NextPage = () => {
  const [viewPassword, setViewPassword] = useBoolean()
  return (
    <Box
      bg="white"
      boxShadow="md"
      w="450px"
      mx="auto"
      p="10"
      rounded="5"
      textAlign="center"
    >
      <Heading as="h5" size="md">
        Welcome to Materio!
      </Heading>
      <Text>Please sign-in to your account and start the</Text>
      <Badge bg="purple.100" rounded="5" my={3}>
        <Text color="purple.400" mb="0" p="2" fontSize="xs">
          Admin: <strong>admin@materio.com</strong> / Pass:{' '}
          <strong>admin</strong>
        </Text>
      </Badge>
      <form>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl mt="3">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={viewPassword ? 'text' : 'password'} />
            <InputRightElement>
              <IconButton
                variant="unstyled"
                aria-label="View password"
                icon={viewPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={setViewPassword.toggle}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex my="3">
          <Checkbox size="md" colorScheme="purple.500">
            Remember Me
          </Checkbox>
          <Spacer />
          <Link href="/">Forgot Password?</Link>
        </Flex>
        <Button w="100%" variant="solid">
          Login
        </Button>
      </form>
    </Box>
  )
}
export default Login
