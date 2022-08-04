import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
      fontSize: 'sm',
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
      fontSize: 'sm',
      _hover: {
        bg: 'purple.500',
        color: 'white',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}

const Badge: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'normal',
    textTransform: 'none',
  },
}

export const theme = extendTheme({
  components: {
    Button,
    Badge,
  },
  styles: {
    global: {
      body: {
        color: 'blackAlpha.700',
        bg: 'gray.100',
        fontSize: 'sm',
      },
      a: {
        color: 'purple.500',
        cursor: 'pointer',
      },
      p: {
        mb: 1.5,
      },
    },
  },
})
