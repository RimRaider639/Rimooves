import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { Image, Heading, Box, Container, useColorModeValue } from "@chakra-ui/react"
import { AiOutlineCloseSquare } from "react-icons/ai"

const Wishlist = () => {
  const [data, setData] = React.useState([])
  const router = useRouter()
  const handleClick = (id) => {
    router.push("/movies/"+id)
  }
  const fetchData = () => {
    axios.get(`https://puce-handsome-elk.cyclic.app/wishlist`)
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  }
  const remove = (id) => {
    axios.delete(`https://puce-handsome-elk.cyclic.app/wishlist/${id}`)
    .then(res=>fetchData())
    .catch(err=>console.log(err))
  }
  const closeBtnColor = useColorModeValue("gray.800", "gray.200")
  React.useEffect(()=>{
    fetchData()
  }, [])
  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxW="80%">
          <Heading color="gray.600" margin="30px auto">Your Wishlist</Heading>
          <Box className={styles.grid}>
            {data.map(movie=><Box key={movie.id} className={styles.card} position="relative">
              <Image src={movie.image} className={styles.poster} onClick={()=>handleClick(movie.id)}/>
              <AiOutlineCloseSquare color={closeBtnColor} style={{position:"absolute", top:0, right:0}} onClick={()=>remove(movie.id)}/>
              <Heading position="absolute" top={150/2} textAlign="center" width="85%" color="white" size={15}>{movie.title}</Heading>
            </Box>)}
          </Box>
        </Container>
      </main>
    </>
    
  )
}

export default Wishlist