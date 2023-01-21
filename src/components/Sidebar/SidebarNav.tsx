import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
                <NavSection title="GERAL">
                    <NavLink icon={RiDashboardLine} children="Dashboard" href="/dashboard"/>   
                    <NavLink icon={RiContactsLine} children="Usuarios" href="/users"/>   
                </NavSection>        
                <NavSection title="AUTOMACAO">
                    <NavLink icon={RiInputMethodLine} href="/forms">Formulario</NavLink>
                    <NavLink icon={RiGitMergeLine} href="/automation">Automacao</NavLink> 
                </NavSection>          
            </Stack>
    )
}