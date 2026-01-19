import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leaderboard')({
    component: LeaderboardComponent,
})

function LeaderboardComponent() {
    return (
        <div className="flex flex-col items-center p-4 space-y-20">
            <h1 className="text-6xl mt-20">Leaderboard</h1>
            <div className='mt-42'>
                ⚠️ WORK IN PROGRESS ⚠️
            </div>

        </div>
    );
}