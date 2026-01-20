import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leaderboard')({
    component: LeaderboardComponent,
})

function LeaderboardComponent() {
    return (
        <div className="flex flex-col lg:justify-center items-center lg:p-4 lg:space-y-20 bg-green-500 grow">
            <h1 className="text-xl lg:text-6xl m-8 lg:mt-20">Leaderboard</h1>
            <div>
                Rule theme all!
            </div>
            <div className='lg:mt-42'>
                ⚠️ WORK IN PROGRESS ⚠️
            </div>

        </div>
    );
}