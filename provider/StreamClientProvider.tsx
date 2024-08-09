"use client"
import { tokenProvider } from '@/actions/stream.actions';
import Loaderer from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    // StreamCall,
    StreamVideo,
    StreamVideoClient,
    // User,
  } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
  
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
  
  export const StreamVideoProvider = ({children}: {children: React.ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    const {isSignedIn, user, isLoaded} = useUser()

    useEffect(()=>{
        if (!isLoaded || !user) return;
        if(!apiKey) throw new Error('Stream API key is missing')
        
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl
            },
            tokenProvider
        })
        setVideoClient(client)
    }, [user, isLoaded])

    if(!videoClient) return <Loaderer />
    return (
      <StreamVideo client={videoClient}>
        
        {children}
      </StreamVideo>
    );
  };