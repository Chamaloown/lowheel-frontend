import { getChampions } from '@/api/champions';
import Select from '@/components/ui/select';
import Wheel from '@/components/wheel/wheel';
import type { Role } from '@/type/role';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';


export const Route = createFileRoute('/')({
  component: HomeComponent,
})


function HomeComponent() {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const { data: champions } = useQuery({
    queryKey: ["champions", selectedRole],
    queryFn: () => getChampions(selectedRole),
    enabled: !!selectedRole,
  });

  const handleSelectRole = (role: string) => {
    setSelectedRole(role as Role);
  }


  const roleOptions = [
    "Top",
    "Jungle",
    "Mid",
    "ADC",
    "Support",
  ].map((role) => ({ label: role, value: role }));

  return (
    <div className="flex min-h-svh flex-col items-center p-4 space-y-8">
      <h1 className="text-9xl mt-8">Lowheel</h1>
      <h3>Autofill Wheel and collect your champ!</h3>
      <Select
        options={roleOptions}
        value={selectedRole as string}
        onChange={(value) => { handleSelectRole(value) }}
        placeholder="Choose a Role"
        className=''
      />
      <div>
        <Wheel count={champions?.length || 20} champions={champions || []} />
      </div>
    </div>
  );
}
