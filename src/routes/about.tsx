// about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: AboutComponent,
})

function AboutComponent() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-4 space-y-8">
            About - Work In Progress ⚠️
        </div>
    );
}