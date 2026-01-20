import { useIsMobile } from "@/hooks/useMobile";

export function Footer() {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <footer className="bottom-1 w-full p-1 text-[0.4rem] text-gray-500 text-center">
                This website is not affiliated with, endorsed, sponsored, or specifically approved by Riot Games, Inc.
                League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
            </footer>
        )
    }
    return (
        <footer className="w-full p-4 text-[0.5rem] text-gray-500 text-center">
            This website is not affiliated with, endorsed, sponsored, or specifically approved by Riot Games, Inc.
            League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
        </footer>
    )
}