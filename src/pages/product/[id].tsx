import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'

import Image from 'next/image'
import Stripe from 'stripe'
import Head from 'next/head'

import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/contexts/cartContext'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const breakpoint = useBreakpoint()
  const { addToCart, checkIfItemAlredyExists } = useCart()
  const isAlredyInCart = checkIfItemAlredyExists(product.id)

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt=""
            width={breakpoint === 'mobile' ? 320 : 520}
            height={breakpoint === 'mobile' ? 280 : 480}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button disabled={isAlredyInCart} onClick={() => addToCart(product)}>
            {isAlredyInCart ? 'Produto já está na sacola' : 'Colocar na sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id || ''

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(price.unit_amount) / 100),
        description: product.description,
        defaultPriceId: price.id,
        numberPrice: Number(price.unit_amount) / 100,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
