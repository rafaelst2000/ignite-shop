import { styled } from '..'

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 6,
  position: 'relative',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  cursor: 'pointer',

  span: {
    position: 'absolute',
    top: -6,
    right: -6,
    background: '$green300',
    color: '$white',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid $gray900',
  },

  variants: {
    color: {
      gray: {
        background: '$gray800',
        color: '$gray500',
      },
      green: {
        background: '$green500',
        color: '$white',

        '&:not(:disabled):hover': {
          backgroundColor: '$green300',
          transition: 'all 0.2s',
        },
      },
    },
    size: {
      medium: {
        width: '3rem',
        height: '3rem',

        svg: {
          fontSize: 24,
        },
      },
      large: {
        width: '3.5rem',
        height: '3.5rem',

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
})
