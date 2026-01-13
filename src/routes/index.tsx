import { getChampions } from '@/api/champions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Select from '@/components/ui/select';
import Wheel from '@/components/wheel/wheel';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Ban, Check } from 'lucide-react';
import { useState } from 'react';


export const Route = createFileRoute('/')({
  component: HomeComponent,
})


function HomeComponent() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedTagLine, setSelectedTagLine] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const { data: champions } = useQuery({
    queryKey: ["champions", selectedRole],
    queryFn: () => getChampions(selectedRole),
    enabled: !!selectedRole,
  });

  const roleOptions = [
    "Top",
    "Jungle",
    "Mid",
    "ADC",
    "Support",
  ].map((role) => ({ label: role, value: role }));

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <h1 className="text-9xl">Lowheel</h1>
      <h3>Autofill Wheel and collect your champ!</h3>
      <div className='flex flex-row space-x-4'>
        <Input onChange={(e) => setSelectedName(e.target.value)} placeholder="Summoner Name" className="w-64" />
        <Input onChange={(e) => setSelectedTagLine(e.target.value)} placeholder="Tag Line" className="w-64" />
        <Button variant={'outline'} onClick={() => {
          console.log("Verify", selectedName, selectedTagLine);
          if (selectedName && selectedTagLine) {
            setIsVerified(true);
          } else {
            setIsVerified(false);
          }
        }}>Verify</Button>
        {isVerified !== null ? isVerified === true ? <Check className='text-green-500 mt-1' /> : <Ban className='text-red-600 mt-1' /> : <></>}
      </div>
      <Select
        options={roleOptions}
        value={selectedRole}
        onChange={(value) => setSelectedRole(value)}
        placeholder="Choose a Role"
      />
      <div>
        <Wheel
          count={champions?.length || 20}
          champions={champions || []}
          onLock={(result) => {
            console.log("Winner:", result.label);
          }} />
      </div>
    </div>
  );
}
