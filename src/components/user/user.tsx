import { useUser } from "@/context/userContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Ban } from "lucide-react";

const User: React.FC = () => {
    const { user, login, logout } = useUser();
    const [selectedName, setSelectedName] = useState<string>("")
    const [selectedTagLine, setSelectedTagLine] = useState<string>("")
    const [isDirty, setIsDirty] = useState<boolean | null>(null)

    return (
        <>
            {user ? (
                <div className="flex flex-row space-x-10">
                    <div className="mt-2">
                        You are logged in as {user.name}!
                    </div>
                    <Button variant={'outline'} onClick={() => {
                        logout()
                        setSelectedName("")
                        setSelectedTagLine("")
                    }}> Logout
                    </Button>
                </div>
            ) : (
                <div className="flex flex-row space-x-6">
                    <Input onChange={(e) => setSelectedName(e.target.value)} placeholder="Summoner Name" className="w-64" value={selectedName} />
                    <Input onChange={(e) => setSelectedTagLine(e.target.value)} placeholder="Tag Line" className="w-64" value={selectedTagLine} />
                    <Button variant={'outline'} onClick={() => {
                        if (selectedName && selectedTagLine) {
                            login({ name: selectedName, tagLine: selectedTagLine })
                            setIsDirty(true)
                        } else {
                        }
                    }}>Login</Button>
                    {!user && isDirty ? <Ban className="mt-2 text-red-500" /> : <></>}
                </div>
            )}
        </>

    );
};
export default User