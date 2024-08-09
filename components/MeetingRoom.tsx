import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
    CallControls,
    CallingState,
    CallParticipantsList,
    CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { LayoutList, Users } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
    const searchParams = useSearchParams()
    const isPersonal = !!searchParams.get('personal')

    const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
    const [showParticipants, setShowParticipants] = useState(false)
    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()
    const router = useRouter()

    if(callingState !== CallingState.JOINED) return <Loader />

    const CallLayout = () => {
        switch (layout) {
            case "grid":
                return <PaginatedGridLayout />
            case "speaker-right":
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }
    return (
        <section className="relative h-screen w-full overflow-auto pt-4 text-white">
            <div className="relative size-full flex-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                        'block': showParticipants
                    })}
                >
                    <CallParticipantsList
                        onClose={() => setShowParticipants(false)}
                    />
                </div>
            </div>
            <div className="fixed bottom-0 flex-center w-full gap-5 flex-wrap">
                <CallControls onLeave={()=> router.push('/')} />
                <DropdownMenu>
                    <div className="flex-center">
                        <DropdownMenuTrigger className="px-4 py-2 cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b]">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                        {['Grid', 'Speaker Left', 'Speaker Right']
                        .map((item, index)=>{
                            return <div key={index}>
                                    <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                                        setLayout(item.toLowerCase() as CallLayoutType)
                                    }}>{item}</DropdownMenuItem>
                                    </div>
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={()=>{ setShowParticipants((prev) => !prev) }}>
                    <div className="px-4 py-2 cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b]">
                        <Users size={20} className='text-white' />
                    </div>
                </button>
                {!isPersonal  && <EndCallButton /> }
            </div>
        </section>
    )
}

export default MeetingRoom
