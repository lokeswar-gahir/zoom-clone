"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void}) => {
    const [isMicCamToggledOn, setMicCamToggledOn] = useState(false)
    const call = useCall()
    if(!call) throw new Error('useCall must be used within Streamcall component')
    useEffect(()=>{
        if(isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone])
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview />
        <div className='h-16 flex-center gap-3'>
            <label className='flex-center gap-2 font-medium'>
                <input type="checkbox" checked={isMicCamToggledOn} onChange={(e)=> setMicCamToggledOn(e.target.checked)} />
                Join with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className='rounded-md bg-green-500 hover:bg-green-600 px-4 py-2.5' onClick={()=> {
            call.join()
            setIsSetupComplete(true)
        }}>
            Join Meeting
        </Button>
    </div>
  )
}

export default MeetingSetup