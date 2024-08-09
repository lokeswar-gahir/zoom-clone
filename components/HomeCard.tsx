import React from "react"
import Image from "next/image"

const HomeCard = ({bgcolor, icon, title, desc, handleClick}: {bgcolor: string, icon: string, title: string, desc: string, handleClick: () => void}) => {
    return (
        <div className={`px-4 py-6 flex flex-col justify-between w-full min-h-[260px] xl:max-w-[270px] rounded-[14px] cursor-pointer `+bgcolor} onClick={handleClick}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image
                    src={icon}
                    alt={title}
                    height={32}
                    width={32}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
                <p className="text-base font-normal">{desc}</p>
            </div>
        </div>
    )
}

export default HomeCard
