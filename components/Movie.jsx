import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Home.module.css'
import {Box, Image, Heading, Text} from "@chakra-ui/react"

const Movie = ({Images, Poster, Title, Year, id}) => {
    const router = useRouter()
    const handleClick = () => {
        router.push("/movies/"+id)
    }
  return (
    <Box key={id} className={styles.card} position="relative">
          <Image src={Images[0]} className={styles.poster} onClick={()=>handleClick(id)}/>
          <Heading position="absolute" top={150/2} textAlign="center" width="85%" color="white" size={15}>{Title}</Heading>
          <Text>{Year}</Text>
    </Box>
  )
}

export default Movie