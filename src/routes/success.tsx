import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@/context/userContext';
import { useQuery } from '@tanstack/react-query';
import { getSuccesses } from '@/api/successes';
import { Lock } from 'lucide-react';

export const Route = createFileRoute('/success')({
  component: SuccessComponent,
})

function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as any;
}

function SuccessComponent() {
  const { user } = useUser()
  const { data: successes } = useQuery({
    queryKey: ["successes", user?.id],
    queryFn: () => getSuccesses(user?.id!),
    enabled: !!user
  })

  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <h1 className="text-6xl mt-20">Success!</h1>
      {successes ? (
        entries(successes).map(([role, list]) => (
          <div key={role} className="w-2/3 flex flex-col space-y-4">
            <div className='flex flex-row space-x-4'>
              <div className='h-0.5 w-full bg-white mt-4'></div>
              <h2 className="text-2xl self-center">
                {role}
              </h2>
              <div className='h-0.5 w-full bg-white mt-4'></div>
            </div>
            <div className="grid grid-cols-10 gap-4">
              {list.map((success) => (
                <div
                  key={success.id}
                  className={`relative h-32 w-32 border-2 rounded-xl overflow-hidden transition-all duration-500 ${success.isCompleted
                    ? "border-yellow-400 opacity-100 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                    : "border-gray-500 opacity-50 hover:opacity-100"}`}
                >
                  {success.isCompleted && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

                      <div className="absolute inset-0 bg-yellow-400/10 animate-pulse" />
                    </div>
                  )}

                  {!success.isCompleted && <Lock className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />}

                  <img
                    className="h-full w-full object-cover"
                    src={success.champion.imgUrl}
                    alt={success.champion.name}
                  />

                  <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs text-center py-1">
                    {success.champion.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : <></>
      }
    </div>
  )
}
