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
      <Select
        options={roleOptions}
        value={selectedRole}
        onChange={(value) => { setSelectedRole(value) }}
        placeholder="Choose a Role"
      />
      <div>
        <Wheel count={champions?.length || 20} champions={champions || []} />
      </div>
    </div>
  );
}
