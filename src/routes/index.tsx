import { getChampions } from '@/api/champions';
import { getRoles, type Role } from '@/api/roles';
import { verify, type Champion } from '@/api/successes';
import LockDialog from '@/components/lock/LockDialog';
import Select from '@/components/ui/select';
import User from '@/components/user/user';
import Wheel from '@/components/wheel/wheel';
import WheelDialog from '@/components/wheel/wheelDialog';
import { useUser } from '@/context/userContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { toast } from "sonner"


export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null)
  const [lockedChampion, setLockedChampion] = useState<Champion | null>(null)
  const [WheelOpen, setWheelOpen] = useState<boolean>(false)
  const [LockOpen, setLockOpen] = useState<boolean>(false)
  const { user } = useUser()

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    enabled: !selectedRole,
  })

  const { data: champions } = useQuery({
    queryKey: ["champions", selectedRole],
    queryFn: () => getChampions(selectedRole!.name),
    enabled: !!selectedRole,
  })

  const mutation = useMutation({
    mutationFn: (variables: { userId: number; championId: number; roleId: number }) =>
      verify(variables.userId, variables.championId, variables.roleId),
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        toast.success("Success Unlocked. GG!")
      }
      if (data.statusCode === 204) {
        toast.error("Success Locked. Good luck next time")
      }
      setLockedChampion(null)
    },
  });

  const onVerify = () => {
    if (!user?.id || !lockedChampion || !selectedRole) {
      toast.error("Missing data for verification (You have to be connected)")
      setLockedChampion(null)
      return;
    }

    mutation.mutate({
      userId: user.id,
      championId: lockedChampion.id,
      roleId: selectedRole.id
    });
  };

  const onLockedChampion = (result: Champion) => {
    setLockedChampion(result)
    setLockOpen(true)
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-6" >
      <h1 className="text-3xl md:text-6xl xl:text-9xl">Lowheel</h1>
      <h3>Autofill Wheel and collect your champ!</h3>
      <User />
      <div className='w-1/3'>
        <Select
          options={roles?.map(role => ({ label: role?.name, value: role?.name })) ?? []}
          value={selectedRole?.name}
          onChange={(value) => setSelectedRole(roles?.find((role) => role.name === value) ?? null)}
          placeholder="Choose a Role"
        />
      </div>
      <div>
        <Wheel
          count={champions?.length || 20}
          champions={champions || []}
          locked={!!lockedChampion}
          onPick={(result) => {
            setSelectedChampion(result)
            setWheelOpen(true)
          }} />
        <WheelDialog champion={selectedChampion} role={selectedRole} open={WheelOpen} setOpen={setWheelOpen} onLock={(result) => onLockedChampion(result)} />
        <LockDialog champion={selectedChampion} role={selectedRole} open={LockOpen} setOpen={setLockOpen} onVerify={onVerify} />
      </div>
    </div >
  );
}
