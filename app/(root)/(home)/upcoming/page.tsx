import CallList from "@/components/CallList"
import React from "react"

const Upcoming = () => {
    return (
        <section className="size-full flex flex-col gap-10">
            <h1 className="text-3xl font-bold">Upcomings</h1>
            <CallList type="upcoming" />
        </section>
    )
}

export default Upcoming
