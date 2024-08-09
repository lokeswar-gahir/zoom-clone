import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"

const avatarImages = [
    "/images/avatar-1.jpeg",
    "/images/avatar-2.jpeg",
    "/images/avatar-3.png",
    "/images/avatar-4.png",
    "/images/avatar-5.png",
]

type meetingCardProps = {
    icon: string
    title: string
    date: string
    isPreviousMeeting?: boolean
    buttonIcon1?: string
    buttonText?: string
    handleClick: () => void
    link: string
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: meetingCardProps) => {
    return (
        <section className="min-h-[256px] w-full flex justify-between flex-col rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                <Image src={icon} alt={"upcoming"} width={28} height={28} />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2 overflow-x-auto">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => {
                        return (
                            <Image
                                key={index}
                                src={img}
                                alt={"avatar"}
                                width={40}
                                height={40}
                                className={cn("rounded-full", {
                                    absolute: index > 0,
                                })}
                                style={{ top: 0, left: index * 28 }}
                            />
                        )
                    })}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-2">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button
                            onClick={handleClick}
                            className="rounded bg-blue-1 hover:bg-blue-400 px-6"
                        >
                            {buttonIcon1 && (
                                <Image
                                    src={buttonIcon1}
                                    alt="feature"
                                    width={20}
                                    height={20}
                                />
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            className="bg-dark-1 hover:bg-dark-3 px-6"
                            onClick={() => {
                                navigator.clipboard.writeText(link)
                                toast({
                                    title: "Link copied",
                                })
                            }}
                        >
                            <Image
                                src={"/icons/copy.svg"}
                                alt="feature"
                                height={20}
                                width={20}
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}

export default MeetingCard
