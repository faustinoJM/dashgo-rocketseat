import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, Link, Stack,Text, useBreakpointValue} from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { useSidebarDrawerContext } from "../../contexts/SidebarDrawerContext";

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {

    const { isOpen, onClose} = useSidebarDrawerContext()

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false
    })
    
    if(isDrawerSidebar) {
        return(
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navegacao</DrawerHeader>

                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }
    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box>
    )
}