import { CartButton } from './CartButton'
import { X } from 'phosphor-react'
import {
  CartClose,
  CartContent,
  CartFinalization,
  CartProduct,
  CartProductDetails,
  CartProductImage,
} from '@/styles/components/cart'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

import axios from 'axios'

export function Cart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { cartItems, removeCartItem, cartTotal } = useCart()
  const cartQuantity = cartItems.length
  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout.')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton showQuantity />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {cartQuantity <= 0 && <p>Seu carrinho está vazio.</p>}

            {cartQuantity >= 1 &&
              cartItems.map((cartItem) => (
                <CartProduct key={cartItem.id}>
                  <CartProductImage>
                    <Image
                      width={100}
                      height={100}
                      alt=""
                      src={cartItem.imageUrl}
                    />
                  </CartProductImage>
                  <CartProductDetails>
                    <p>{cartItem.name}</p>
                    <strong>{cartItem.price}</strong>
                    <button onClick={() => removeCartItem(cartItem.id)}>
                      Remover
                    </button>
                  </CartProductDetails>
                </CartProduct>
              ))}
          </section>

          <CartFinalization>
            <section>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity !== 1 ? 'itens' : 'item'}
                </p>
              </div>
              <div>
                <span>Valor total</span>
                <p>{formattedCartTotal}</p>
              </div>
            </section>
            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
            >
              {isCreatingCheckoutSession
                ? 'Redirecionando para o pagamento...'
                : 'Finalizar compra'}
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
