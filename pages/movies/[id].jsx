import { useRouter } from 'next/router'
import React from 'react'
import Carousel from '../../components/Carousal';
import Head from 'next/head'
import {
    Box,
    Container,
    Stack,
    Text,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    Table,
    Tr,
    Td,
    Tbody,
  } from '@chakra-ui/react';
  import axios from 'axios'

  const Movie = ({data}) => {
    return (
      <>
          {data && <Layout {...data}/>}
      </>
    )
} 
 function Layout({id, Images, Title, Year, Plot, Released, Type, Runtime, Genre, Director, Writer, Actors, Language, Country, Awards, imdbRating, imdbVotes}) {
    const addToWishlist = () => {
        axios.post(`https://puce-handsome-elk.cyclic.app/wishlist`, {
            id,
            image: Images[0],
            title: Title
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    } 
    
    return (
      <>
      <Head>
        <title>{Title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex flexDirection="column">
              <Carousel Images={Images}/>
              <Button
              onClick={addToWishlist}
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('gray.900', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}>
                Add to Wishlist
              </Button>
              <Button
              onClick={addToWishlist}
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                variant="outline"
                borderColor={useColorModeValue('gray.900', 'gray.50')}
                // bg={useColorModeValue('gray.900', 'gray.50')}
                // color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  backgroundColor: useColorModeValue('gray.900', 'gray.50'),
                  color: useColorModeValue('white', 'black')
                }}>
                Watch Now
              </Button>
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                  {Title}
                </Heading>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={300}
                  fontSize={'2xl'}>
                  {Year+" | "+Type[0].toUpperCase()+Type.slice(1)}
                </Text>
              </Box>
    
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  />
                }>
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color="black"
                    fontSize={'sm'}
                    fontWeight={'600'}
                    padding="2px 5px"
                    display="block"
                    border="2px solid black"
                    backgroundColor="yellow.500">
                    {imdbRating.length && "IMDB " + imdbRating + " (" + imdbVotes + " votes)"}
                  </Text>
                  <Text fontSize={'lg'}>
                    {Plot}
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                    DETAILS
                  </Text>
                  <SimpleGrid columns={{ base: 2, md: 2 }} spacing={2}>
                    <List spacing={2} fontWeight={600}>
                      <ListItem>Released</ListItem>
                      <ListItem>Duration</ListItem>
                      <ListItem>Genre</ListItem>
                      <ListItem>Country</ListItem>
                      <ListItem>Language</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>{Released}</ListItem>
                      <ListItem>{Runtime}</ListItem>
                      <ListItem>{Genre}</ListItem>
                      <ListItem>{Country}</ListItem>
                      <ListItem>{Language}</ListItem>
                    </List>
                  </SimpleGrid>   
              </Box>  
                
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                    About the movie
                  </Text>
    
                  <Table spacing={10}>
                    <Tbody>
                      <Tr>
                        <Td fontWeight={600}>Director</Td>
                        <Td>{Director}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>Writer</Td>
                        <Td>{Writer}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>Actors</Td>
                        <Td>{Actors}</Td>
                      </Tr>
                      <Tr>
                        <Td fontWeight={600}>Awards</Td>
                        <Td>{Awards}</Td>
                      </Tr>
                    </Tbody>

                  </Table>
                </Box>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </main>
      </>

    );
  }
  export function getStaticPaths(){
    return fetch(`https://movies-database-gold.vercel.app/movies`)
    .then(res=>res.json())
    .then(res=>({paths:res.map(movie=>({params:{id:String(movie.id)}})),
    fallback:false}))
    .catch(err=>({notFound: true}))
  }
  export function getStaticProps(context){
    const id = context.params.id;
    return fetch(`https://movies-database-gold.vercel.app/movies/${id}`)
    .then(res=>res.json())
    .then(res=>({props:{data:res}}))
    .catch(err=>({notFound: true}))
  }

export default Movie