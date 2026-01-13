import { createFileRoute } from '@tanstack/react-router'
import { champsByRole } from '../data/champions';

export const Route = createFileRoute('/success')({
  component: SuccessComponent,
})

function SuccessComponent() {
  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <h1 className="text-6xl mt-20">Success!</h1>
      <p className="mt-4 text-2xl">All random champion that you collected</p>
      <div>Top :</div>
      <div className='grid grid-cols-12 gap-4'>
        {champsByRole.Top.map((champ) => (
          <div className='h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl  flex items-center justify-center'>
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>Jungle :</div>
      <div className='grid grid-cols-12 gap-4'>
        {champsByRole.Jungle.map((champ) => (
          <div className='h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl  flex items-center justify-center'>
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>Mid :</div>
      <div className='grid grid-cols-12 gap-4'>
        {champsByRole.Mid.map((champ) => (
          <div className='h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl  flex items-center justify-center'>
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>ADC :</div>
      <div className='grid grid-cols-12 gap-4'>
        {champsByRole.ADC.map((champ) => (
          <div className='h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl  flex items-center justify-center'>
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
      <div>Support :</div>
      <div className='grid grid-cols-12 gap-4'>
        {champsByRole.Support.map((champ) => (
          <div className='h-32 w-32 border-2 border-gray-500 opacity-50 rounded-xl  flex items-center justify-center'>
            <span key={champ} className="mr-2">{champ}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
