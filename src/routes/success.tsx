import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/success')({
  component: SuccessComponent,
})

function SuccessComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      Success  - Work In Progress ⚠️
    </div>
  );
}
