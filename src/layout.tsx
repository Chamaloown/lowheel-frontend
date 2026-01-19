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

export function Layout({ children }: { children: React.ReactNode }) {
    const navigationMenuItems = [
        { title: "Wheel", to: "/", icon: LoaderPinwheel },
        { title: "Success", to: "/success", icon: Trophy },
        { title: "About", to: "/about", icon: BookOpen },
        { title: "Leaderboard", to: "/leaderboard", icon: Swords },
    ];
    return (
        <div className="flex flex-col min-h-screen w-full">
            <div className="w-full flex justify-center items-center mt-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-row  space-x-7">
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
            <Toaster />
            <footer className="w-full p-4 text-[10px] text-gray-500 text-center">
                This website is not affiliated with, endorsed, sponsored, or specifically approved by Riot Games, Inc.
                League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
            </footer>
        </div>
    );

}
