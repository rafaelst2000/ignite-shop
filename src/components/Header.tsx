import { HeaderContainer } from '@/styles/pages/app'

import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import { Cart } from './Cart'
import Link from 'next/link'

export function Header() {
  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg} alt="" />
      </Link>
      <Cart />
    </HeaderContainer>
  )
}
