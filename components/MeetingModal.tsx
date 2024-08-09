import React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Loader from "./Loader"

type meetingModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    className?: string
    children?: React.ReactNode
    buttonText: string
    handleClick?: () => void
    image?: string
    buttonIcon?: string
    modalButtonLoading: boolean
}

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    children,
    buttonText,
    buttonIcon,
    image,
    handleClick,
    modalButtonLoading
}: meetingModalProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent className='w-full max-w-[520px] flex flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} width={72} height={72} alt="image" />
                        </div>
                    )}
                    <h1 className={cn("text-2xl font-bold", className)}>{title}</h1>
                    {children}

                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-dark-1 hover:bg-dark-2 border-none rounded-md"><div className="text-white">Cancel</div></AlertDialogCancel>
                        <Button className="bg-blue-1 hover:bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
                            {buttonIcon && <Image src={buttonIcon} alt="buttonIcon" width={13} height={13} />}
                            &nbsp;
                            {modalButtonLoading ? <Loader /> : buttonText }
                        </Button>
                    </AlertDialogFooter>
                    
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MeetingModal
