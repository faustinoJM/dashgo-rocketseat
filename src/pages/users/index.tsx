import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Th, Td, Thead, Tr, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { GetServerSideProps } from "next";

export default function UserList({ users }: any) {
    //cache stale while revalidate
    // const { data, isLoading, isFetching, error } = useQuery('users', async () => {
    //     // const response = await fetch('http://localhost:3000/api/users')
    //     // const data = await response.json()
    //     const { data } = await api.get('users')

    //     const users = data.users.map(user => {
    //         return {
    //             id: user.id,
    //             name: user.name,
    //             email: user.email,
    //             createdAt: new Date(user.createdAt).toLocaleDateString(
    //                 'pt-BR', {
    //                     day: '2-digit',
    //                     month: 'long',
    //                     year: 'numeric'
    //                 }
    //             )
    //         };
    //     });

    //     return users;
    // }, {
    //     staleTime: 1000 * 5,
    // })
    // console.log(data)
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page)
 
    // useEffect(() => {
    //     fetch('http://localhost:3000/api/users')
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // }, [])  

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })


    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['users', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data
        }, {
             staleTime: 1000 * 60 * 10 // 10min
        })
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuarios
                            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                            </Heading>
                        <NextLink href="/users/create" passHref>
                            <Button 
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                                >
                                Criar novo
                            </Button>
                        </NextLink>
                        
                    </Flex>
                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex>
                            <Text>Falha a obter os dados dos usuarios</Text>
                        </Flex>    
                    ) : (
                        <>
                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                        <Checkbox colorScheme="pink" />
                                    </Th>
                                    <Th>Usuario</Th>
                                    { isWideVersion && <Th>Data de cadastro</Th> }
                                    <Th  width="8"></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.users.map(user => {
                                    return (
                                    <Tr key={user.id}>
                                    <Td px={["4", "4", "6"]}>
                                        <Checkbox colorScheme="pink" />
                                    </Td>
                                    <Td>
                                        <Box>
                                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                <Text fontWeight="bold">{user.name}</Text>
                                            </Link>
                                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                        </Box>
                                    </Td>
                                    { isWideVersion && <Td>{user.createdAt}</Td> }
                                    <Td width="">
                                        <Button 
                                            as="a" 
                                            size="sm" 
                                            fontSize="sm" 
                                            colorScheme="purple"
                                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                        >
                                        { isWideVersion ? "Editar" : ""}
                                        </Button>
                                    </Td>
                                </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                        <Pagination 
                            totalCountRegisters={data.totalCount}
                            currentPage={page}
                            onPageChange={setPage}
                        />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
} 

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { users, totalCount} = await getUsers(1)
    
//     return {
//         props: {

//         }
//     }
// }