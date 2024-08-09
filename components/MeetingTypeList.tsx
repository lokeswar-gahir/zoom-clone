"use client"
import Image from "next/image"
import React, { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from "react-datepicker"
import { Input } from "./ui/input"

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<
        | undefined
        | "isScheduleMeeting"
        | "isJoiningMeeting"
        | "isInstanceMeeting"
    >()
    const router = useRouter()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        datetime: new Date(),
        description: "",
        link: "",
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()
    const [isModalButtonLoading, setIsModalButtonLoading] =
        useState<boolean>(false)

    const createMeeting = async () => {
        setIsModalButtonLoading(true)
        if (!user || !client) return
        try {
            if (!values.datetime) {
                toast({ title: "Please select a date and time." })
                return
            }
            const ID = crypto.randomUUID()
            const call = client.call("default", ID)

            if (!call) throw new Error("Failed to create a call")

            const startsAt =
                values.datetime.toISOString() ||
                new Date(Date.now()).toISOString()
            const description = values.description || "Instant meeting"

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            })

            setCallDetails(call)
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({ title: "Meeting created" })
            setIsModalButtonLoading(false)
        } catch (error) {
            console.log(error)
            toast({ title: "Failed to create meeting" })
            setIsModalButtonLoading(false)
        }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <HomeCard
                bgcolor="bg-orange-400"
                icon="/icons/add-meeting.svg"
                title="New Meeting"
                desc="Start an instant meeting"
                handleClick={() => setMeetingState("isInstanceMeeting")}
            />
            <HomeCard
                bgcolor="bg-blue-600"
                icon="/icons/schedule.svg"
                title="Schedule Meeting"
                desc="Plan your meeting"
                handleClick={() => setMeetingState("isScheduleMeeting")}
            />
            <HomeCard
                bgcolor="bg-purple-600"
                icon="/icons/recordings.svg"
                title="View Recordings"
                desc="Check out your Recordings"
                handleClick={() => router.push("/recordings")}
            />
            <HomeCard
                bgcolor="bg-yellow-500"
                icon="/icons/join-meeting.svg"
                title="Join Meeting"
                desc="Via invitation link"
                handleClick={() => {
                    setMeetingState("isJoiningMeeting")
                }}
            />
            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Create meeting"
                    className=""
                    handleClick={createMeeting}
                    buttonText="Schedule Meeting"
                    modalButtonLoading={isModalButtonLoading}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-300">
                            Add a description
                        </label>
                        <Textarea
                            className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-300">
                            Select date and time
                        </label>
                        <ReactDatePicker
                            selected={values.datetime}
                            onChange={(date) =>
                                setValues({ ...values, datetime: date! })
                            }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Scheduled"
                    className="flex-center"
                    modalButtonLoading={false}
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: "Link copied" })
                    }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting Link"
                />
            )}
            <MeetingModal
                isOpen={meetingState === "isInstanceMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an instant meeting"
                className=""
                buttonText="Start Meeting"
                handleClick={createMeeting}
                modalButtonLoading={isModalButtonLoading}
            />
            <MeetingModal
                isOpen={meetingState === "isJoiningMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Apply the invitaion link"
                className=""
                buttonText="Join Meeting"
                handleClick={() => {
                    if (
                        values.link.startsWith(`${process.env.NEXT_PUBLIC_BASE_URL}`) ||
                        values.link.startsWith(`${process.env.NEXT_PUBLIC_SECONDARY_BASE_URL}`)
                    ) {
                        router.push(values.link)
                    } else {
                        toast({ title: "Enter a valid URL" })
                    }
                }}
                modalButtonLoading={isModalButtonLoading}
            >
                <Input
                    placeholder="Meeting link"
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) =>
                        setValues({ ...values, link: e.target.value })
                    }
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList
