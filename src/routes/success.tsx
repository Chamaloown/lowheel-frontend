import { createFileRoute } from '@tanstack/react-router'
import { champsByRole } from '../data/champions';

export const Route = createFileRoute('/success')({
  component: SuccessComponent,
})

function SuccessComponent() {
  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <h1 className="text-6xl mt-20">Success!</h1>
      <div>Top</div>
      <div className='grid grid-cols-12 gap-4 space-y-6'>
        {champsByRole.Top.map((champ) => (
          <div className='relative h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl space-y-0.5'>
            <img className="h-full w-full object-cover rounded-xl" src="https://placehold.co/400" alt="" />
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>Jungle</div>
      <div className='grid grid-cols-12 gap-4 space-y-6'>
        {champsByRole.Jungle.map((champ) => (
          <div className='relative h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl space-y-0.5'>
            <img className="h-full w-full object-cover rounded-xl" src="https://placehold.co/400" alt="" />
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>Mid</div>
      <div className='grid grid-cols-12 gap-4 space-y-6'>
        {champsByRole.Mid.map((champ) => (
          <div className='relative h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl space-y-0.5'>
            <img className="h-full w-full object-cover rounded-xl" src="https://placehold.co/400" alt="" />
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>ADC</div>
      <div className='grid grid-cols-12 gap-4 space-y-6'>
        {champsByRole.ADC.map((champ) => (
          <div className='relative h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl space-y-0.5'>
            <img className="h-full w-full object-cover rounded-xl" src="https://placehold.co/400" alt="" />
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>Support</div>
      <div className='grid grid-cols-12 gap-4'>
        {champsByRole.Support.map((champ) => (
          <div className='relative h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl space-y-0.5'>
            <img className="h-full w-full object-cover rounded-xl" src="https://placehold.co/400" alt="" />
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
