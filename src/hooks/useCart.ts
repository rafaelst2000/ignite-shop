import { CartContext } from '@/contexts/cartContext'
import { useContext } from 'react'

export function useCart() {
  return useContext(CartContext)
}
