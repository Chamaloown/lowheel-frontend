import type { Role } from "@/api/roles"
import type { Champion } from "@/api/successes"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Dispatch, SetStateAction } from "react"

export interface LockDialogProps {
    role: Role | null
    champion: Champion | null
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onVerify?: (champion: Champion, role: Role) => void

}

const LockDialog: React.FC<LockDialogProps> = ({ role, champion, open, setOpen, onVerify }) => {


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black border-2 border-golden w-4/6">
                <DialogHeader className="flex flex-col space-y-10">
                    <DialogTitle className="text-xl flex flex-col justify-center items-center space-y-4">
                        Play your game on {role?.name} with {champion?.name} then click on verify when you have finished your game.
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="hover:bg-golden">Close</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" className="hover:bg-golden" onClick={() => onVerify?.(champion!, role!)}>Verify</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default LockDialog
