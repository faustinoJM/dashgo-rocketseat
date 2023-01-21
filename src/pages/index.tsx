import { Flex, Button, Stack} from "@chakra-ui/react"
import { Input } from "../components/Form/Input"
import { SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatorio").email("E-mail invalido"),
  password: yup.string().required("Senha obrigatorio")
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSingIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    console.log(values)
    }
  
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
      >

        <Flex   
          as="form" 
          width="100%" 
          maxWidth={365} 
          bg="gray.800" 
          p="8" 
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSingIn)}
          >

          <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" error={errors.email} 
            {...register("email")}
          />
          <Input name="password" type="password" label="Senha" error={errors.password} 
            {...register("password")}
          />
          </Stack>


          <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
        </Flex>
    </Flex>
  )
}



// import { Center, Flex, Input, Button, Stack, FormLabel, FormControl} from "@chakra-ui/react"

// export default function Home() {
//   return (
//     <Flex 
//       w="100vw" 
//       h="100vh" 
//       align="center" 
//       justify="center"
//       >

//         <Flex   
//           as="form" 
//           width="100%" 
//           maxWidth={365} 
//           bg="gray.800" 
//           p="8" 
//           borderRadius={8}
//           flexDir="column"
//           >

//           <Stack spacing="4">
//             <FormControl>
//               <FormLabel htmlFor="email">E-mail</FormLabel>

//               <Input 
//                 id="email" 
//                 name="email" 
//                 type="email" 
//                 focusBorderColor="pink.500" 
//                 bgColor="gray.900"
//                 variant="filled" 
//                 _hover={{
//                   bgColor: 'gray.900'
//                 }}
//                 size="lg"
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel htmlFor="password" >Senha</FormLabel>
            
//               <Input 
//                 id="password"  
//                 name="password" 
//                 type="password" 
//                 focusBorderColor="pink.500" 
//                 bgColor="gray.900"
//                 variant="filled"
//                 _hover={{
//                   bgColor: 'gray.900'
//                 }}
//                 size="lg"
//               />
//             </FormControl>
//           </Stack>


//           <Button type="submit" mt="6" colorScheme="pink" size="lg">Entrar</Button>
//         </Flex>
//     </Flex>
//   )
// }
