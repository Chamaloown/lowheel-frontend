// about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: AboutComponent,
})

function AboutComponent() {
    return (
        <div className="flex flex-col items-center p-4 space-y-20">
            <h1 className="text-6xl mt-20">About</h1>
            <div className='w-1/2'>
                A gamification app that enhances the League of Legends player experience through a champion challenge system. Users spin a randomized wheel to receive a champion assignment, then must play and win a match with that champion to mark it as completed in their collection. The app tracks player progress as they work toward completing challenges with all champions in the game.
            </div>
            <div className='h-2 w-2 rounded-full bg-golden'></div>
            <div>
                yap yap yap
            </div>
            <div className='h-2 w-2 rounded-full bg-golden'></div>
            <div>
                yap yap yap
            </div>
            <div className='h-2 w-2 rounded-full bg-golden'></div>
            <div>
                yap yap yap
            </div>
        </div>
    );
}