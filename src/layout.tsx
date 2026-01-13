import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { BookOpen, LoaderPinwheel, Trophy } from "lucide-react";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export function Layout({ children }: { children: React.ReactNode }) {
    const navigationMenuItems = [
        { title: "Wheel", to: "/", icon: LoaderPinwheel },
        { title: "Success", to: "/success", icon: Trophy },
        { title: "About", to: "/about", icon: BookOpen },
    ];
    return (
        <div className="flex flex-col justify-center items-center my-4">
            <NavigationMenu className="flex justify-center items-center">
                <NavigationMenuList className="flex flex-row space-x-7  ">
                    {navigationMenuItems.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                asChild
                            >
                                <Link to={item.to} className="flex-row items-center gap-2.5">
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="w-full h-0.5 bg-golden mt-4"></div>
            <main>{children}</main>
            {/* <TanStackRouterDevtools /> */}

        </div>
    );
}
