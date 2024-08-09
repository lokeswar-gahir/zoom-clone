import React from "react"
import CurrentDateTime from "@/components/currentDateTime"
import MeetingTypeList from "@/components/MeetingTypeList"

const Home = () => {
    return (
        <section className="size-full flex flex-col gap-10">
            <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover bg-center flex-between">
                <div className="h-full flex flex-col justify-between max-md:px-5 max-md:py-8 md:p-8 lg:p-11" >
                    <h2 className="max-w-[270px] rounded p-2 text-center text-base font-normal"></h2>

                    <CurrentDateTime />
                </div>
            </div>
            <MeetingTypeList />
        </section>
    )
}

export default Home
