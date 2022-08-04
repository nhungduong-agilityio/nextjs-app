import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { User } from '@models/user'
import { useMutation } from '@tanstack/react-query'
import { loginWithEmailAndPassword } from 'apis'
import { ROUTERS } from 'constants/routers'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MutableRefObject, useRef, useState } from 'react'
import { loginValidator, storage, validateLogin } from 'utils'

const Login: NextPage = () => {
  const router = useRouter()
  const [viewPassword, setViewPassword] = useBoolean()
  const [errors, setErrors] = useState(loginValidator)
  const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const passwordRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const mutation = useMutation(loginWithEmailAndPassword, {
    onSuccess: (response: User) => {
      storage.setToken(response.email)
      router.push(ROUTERS.LIST)
    },
  })

  const handleLogin = () => {
    const payload = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    }

    const results = validateLogin(payload, {
      email: ['required', 'email'],
      password: ['required', 'password'],
    })

    if (results.isValid) {
      mutation.mutate(payload)
    } else {
      setErrors(results)
    }
  }

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
      <FormControl isInvalid={!!errors.messages.email}>
        <FormLabel>Email</FormLabel>
        <Input type="email" ref={emailRef} />
        <FormErrorMessage>{errors.messages.email}</FormErrorMessage>
      </FormControl>
      <FormControl mt="3" isInvalid={!!errors.messages.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={viewPassword ? 'text' : 'password'} ref={passwordRef} />
          <InputRightElement>
            <IconButton
              variant="unstyled"
              aria-label="View password"
              icon={viewPassword ? <ViewIcon /> : <ViewOffIcon />}
              onClick={setViewPassword.toggle}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.messages.password}</FormErrorMessage>
      </FormControl>
      <Flex my="3">
        <Checkbox size="md" colorScheme="purple.500">
          Remember Me
        </Checkbox>
        <Spacer />
        <Link href={ROUTERS.LIST}>Forgot Password?</Link>
      </Flex>
      <Button w="100%" variant="solid" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  )
}
export default Login
