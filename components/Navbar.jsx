import React from 'react'
import Link from 'next/link'
import ThemeToggler from './ThemeToggler'
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const toHome = () => {
    router.push("/")
  }
  const logoColor = useColorModeValue("blue.600", "blue.400")
  return (
    <Flex   padding="10px 30px" textDecoration="none" alignItems="center" justify="space-between">
      <Flex border="1px solid" borderColor={logoColor} borderRadius="5px" padding="0 10px" cursor="pointer" onClick={toHome}>
        <Text as='kbd' fontWeight="900" color={logoColor}>RIMOOVES.com</Text>
      </Flex>
      <Flex gap="30px" alignItems="center" >
        <Link href="/">Home</Link>
        <Link href="/wishlist">Wishlist</Link>
        <ThemeToggler/>
      </Flex>

        
    </Flex>
  )
}

export default Navbar