import { Flex, Text, Input, Icon, HStack, Box, Avatar, useBreakpointValue, IconButton} from "@chakra-ui/react"
import { useContext } from "react"
import { RiMenLine, RiMenuLine, RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri'
import { useSidebarDrawerContext } from "../../contexts/SidebarDrawerContext"
import { Logo } from "../Header/Logo"
import { NotificationsNav } from "../Header/NotificationNav"
import { Profile } from "../Header/Profile"
import { SearchBox } from "../Header/SearchBox"

export function Header() {

    const { onOpen } = useSidebarDrawerContext()

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
            >
                        
            { !isWideVersion && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine}  />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                >

                </IconButton>
            )}

            <Logo />

            {isWideVersion && <SearchBox />}
            
            <Flex
                align="center"
                ml="auto"
            >       
                <NotificationsNav />      
                <Profile showProfileData={isWideVersion}/>
            </Flex>
        </Flex>
    )
}