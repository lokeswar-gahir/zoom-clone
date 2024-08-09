"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const EndCallButton = () => {
    const router = useRouter()
    const call = useCall()
    const {useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call?.state.createdBy.id

    if(!isMeetingOwner) return null
  return (
    <Button className='bg-red-500 hover:bg-red-600 rounded-md' onClick={async ()=>{
        await call.endCall()
        // call.camera.disable()
        // call.microphone.disable()
        router.push("/")
    }}>
        End for Everyone
    </Button>
  )
}

export default EndCallButton