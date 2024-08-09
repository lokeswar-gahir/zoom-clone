"use client"
import React, { useEffect, useState } from "react"

const CurrentDateTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(()=>{
        const timer = setInterval((()=>{
            setCurrentTime(new Date())
        }), 30000)
        return () => clearInterval(timer);
    }, [])
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    const formattedhour = hours % 12 || 12
    const ampm = hours>12 ? "PM": "AM"

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = currentTime.getDate()
    const monthIndex = currentTime.getMonth()
    const year = currentTime.getFullYear()
    const dayIndex = currentTime.getDay()
    return (
        <div className="flex flex-col gap-2">
            {/* <h1 className="text-4xl font-extrabold">11:30 AM</h1> */}
            <h1 className="text-4xl font-extrabold">{formattedhour < 10 ? `0${formattedhour}` : formattedhour}:{ minutes < 10 ? `0${minutes}` : minutes} {ampm}</h1>
            <p className="text-lg font-bold text-sky-200">
                {weekdays[dayIndex]}, {monthList[monthIndex]} {date < 10 ? `0${date}` : date}, {year}<br/>
            </p>
        </div>
    )
}

export default CurrentDateTime
