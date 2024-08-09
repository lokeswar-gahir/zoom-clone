"use client"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useGetCallById } from "@/hooks/useGetCallById"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import React from "react"
import { useRouter } from "next/navigation"

const Table = ({title, description}: {title: string, description: string})=> {
      return <div className="flex flex-col gap-0 items-start xl:flex-row overflow-x-auto">
        {/*  */}
        <h1 className="text-base font-medium text-sky-300 xl:min-w-32">{title}:</h1>
        {/*  */}
        <p className="flex  text-nowrap text-sm font-semibold max-md:max-w-[320px] max-lg:max-w-[70%] lg:text-base">{description}</p>

      </div>
}

const PersonalRoom = () => {
  const { user, isLoaded }= useUser()
  const client = useStreamVideoClient()
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const {call} = useGetCallById(meetingId!)
  const router = useRouter()

  if(!isLoaded) return <Loader />
  
  const startRoom = async () =>{
    if (!client || !user) return
    
    if(!call){
      const newCall = client.call('default', meetingId!)
      await newCall?.getOrCreate({
        data: {
            starts_at: new Date().toISOString(),
        },
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
    toast({title: 'Entering your personal room'})
  }
  return (
      <section className="size-full flex flex-col gap-10">
          <h1 className="text-3xl font-bold">Personal Room</h1>
          <div className="w-full flex flex-col gap-8 xl:max-w-[900px]">
          {/*  */}
            <Table title="Topic" description={`${user?.username}'s meeting room`} />
            <Table title="Meeting ID" description={meetingId!} />
            <Table title="Invite Link" description={meetingLink} />
          </div>
          <div className="flex gap-5">
            <Button className="bg-blue-1 hover:bg-blue-400" onClick={startRoom}>Start Meeting</Button>
            <Button className="bg-dark-3" onClick={()=>{
                  navigator.clipboard.writeText(meetingLink)
                  toast({title: 'Link copied'})
              }}>Copy Invitation</Button>
          </div>
      </section>
  )
}

export default PersonalRoom
