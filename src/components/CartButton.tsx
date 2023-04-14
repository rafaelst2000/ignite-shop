import { useCart } from '@/hooks/useCart'
import { CartButtonContainer } from '@/styles/components/cartButton'
import { Handbag } from 'phosphor-react'
import { ComponentProps } from 'react'

interface CartButtonProps extends ComponentProps<typeof CartButtonContainer> {
  showQuantity?: boolean
}

export function CartButton({ showQuantity = false, ...props }: CartButtonProps) {
  const { cartItems } = useCart()
  const cartQuantity = cartItems.length

  return (
    <CartButtonContainer {...props}>
      <Handbag weight='bold'/>
      {(showQuantity && cartQuantity > 0) && <span>{cartQuantity}</span>}
    </CartButtonContainer>
  )
}