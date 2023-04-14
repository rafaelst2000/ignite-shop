import { HomeContainer, Product } from '@/styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'
import 'keen-slider/keen-slider.min.css'
import { CartButton } from '@/components/CartButton'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/contexts/cartContext'
import { MouseEvent } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const breakpoint = useBreakpoint()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: breakpoint === 'desktop' ? 3 : 1.2,
      spacing: breakpoint === 'desktop' ? 48 : 12,
    },
  })
  const { addToCart, checkIfItemAlredyExists } = useCart()

  function handleAddToCart(
    event: MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) {
    event.preventDefault()
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <CartButton
                    disabled={checkIfItemAlredyExists(product.id)}
                    color="green"
                    size="large"
                    onClick={(event) => handleAddToCart(event, product)}
                  />
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(price.unit_amount) / 100),
      numberPrice: Number(price.unit_amount) / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
