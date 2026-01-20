import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { BookOpen, LoaderPinwheel, Swords, Trophy } from "lucide-react";
import { Toaster } from "sonner";
import { useIsMobile } from "./hooks/useMobile";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "./components/ui/sidebar";
import { Footer } from "./components/footer/footer";


export function Layout({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile()

    const navigationMenuItems = [
        { title: "Wheel", to: "/", icon: LoaderPinwheel },
        { title: "Success", to: "/success", icon: Trophy },
        { title: "About", to: "/about", icon: BookOpen },
        { title: "Leaderboard", to: "/leaderboard", icon: Swords },
    ];

    if (isMobile) {
        return (
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader />
                    <SidebarContent className="bg-black">
                        <SidebarGroup />
                        <SidebarMenu>
                            {navigationMenuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.to}>
                                            <item.icon />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            ))}
                        </SidebarMenu>
                        <SidebarGroup />
                    </SidebarContent>
                    <SidebarFooter />
                </Sidebar>
                <main className="flex flex-col grow">
                    <SidebarTrigger className=" absolute left-8 top-8" />
                    {children}
                    <Footer />
                </main>
                <Toaster />
            </SidebarProvider>

        )
    }
    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="w-full flex justify-center items-center mt-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-row space-x-7">
                        {navigationMenuItems.map((item) => (
                            <NavigationMenuItem key={item.title}>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    asChild
                                >
                                    <Link to={item.to} className="flex flex-row items-center gap-2.5">
                                        <item.icon className="h-5 w-5 shrink-0" />
                                        {item.title}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="w-full h-0.5 bg-golden mt-4"></div>
            <main className="grow">
                {children}
            </main>
            <Footer />
            <Toaster />
        </div>
    );

}
