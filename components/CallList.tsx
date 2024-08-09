// @ts-nocheck
"use client"
import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import MeetingCard from "./MeetingCard"
import Loader from "./Loader"
import { useToast } from "./ui/use-toast"

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const router = useRouter()
    const toast = useToast()
    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls
            case "recordings":
                return recordings
            case "upcoming":
                return upcomingCalls
            default:
                return []
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "No ended calls"
            case "recordings":
                return "No recordings"
            case "upcoming":
                return "No upcoming calls"
            default:
                return ""
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
          const callData = await Promise.all(
            callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
          );
    
          const recordings = callData
            .filter((call) => call.recordings.length > 0)
            .flatMap((call) => call.recordings);
    
          setRecordings(recordings);
        };
    
        if (type === 'recordings') {
          fetchRecordings();
        }
      }, [type, callRecordings])

    if(isLoading) return <div className="flex-center max-h-[50vh] w-full"><Loader /></div>
    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()
    

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            
            {calls && calls.length > 0 ? (
                calls.map((meeting) => {
                    return (
                        <MeetingCard
                            key={(meeting as Call).id}
                            icon={type === "upcoming"
                                ? "/icons/upcoming.svg"
                                : type === "ended"
                                    ? "/icons/previous.svg"
                                    : "/icons/recordings.svg"}
                            title={(meeting as Call).state?.custom.description|| meeting.filename || "Personal Meeting"}
                            date={meeting.state?.startsAt.toLocaleString()}
                            isPreviousMeeting={type === "ended"}
                            buttonIcon1={type === 'recordings'? '/icons/play.svg': undefined}
                            buttonText={type === 'recordings'? 'Play' : 'Start'}
                            link={type === 'recordings'? meeting?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}` }
                            handleClick={
                                type === 'recordings'
                                ? ()=> router.push(`${meeting.url}`)
                                : ()=> {router.push(`/meeting/${meeting.id}`); toast({title: "Joining Meeting..."})}
                            }
                            />
                    )
                })
            ) : (
                <>
                {/* <div>{callRecordings?.length > 0 ? `${JSON.stringify(callRecordings[0])}`: "no"}</div> */}
                <h1 className="text-2xl font-bold">

                    {noCallsMessage}
                </h1>
                </>
            )}
        </div>
    )
}

export default CallList
