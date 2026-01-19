import type { Role } from "@/api/roles"
import type { Champion } from "@/api/successes"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Dispatch, SetStateAction } from "react"

export interface WheelDialogProps {
    role: Role | null
    champion: Champion | null
    onLock?: (champion: Champion) => void
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const WheelDialog: React.FC<WheelDialogProps> = ({ role, champion, open, setOpen, onLock }) => {


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black border-2 border-golden w-4/6">
                <DialogHeader className="flex flex-col space-y-10">
                    <DialogTitle className="text-xl flex flex-col justify-center items-center">LETS GO!</DialogTitle>
                    <DialogDescription className="text-3xl flex flex-col justify-center items-center space-y-4">
                        <span>
                            You have to play
                        </span>
                        <span className="text-6xl text-golden">
                            {role?.name}
                        </span>
                        <span>
                            with
                        </span>
                        <span className="text-9xl text-golden">
                            {champion?.name}!
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="hover:bg-golden">Retry</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" className="hover:bg-golden" onClick={() => onLock?.(champion!)}>lock in</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default WheelDialog
