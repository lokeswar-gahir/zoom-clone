'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import Image from "next/image"
import navLinks from "./NavLinkConstants"
const Sidebar = () => {
    

    const currentPath = usePathname()
    return (
        <section className="text-white sticky top-0 left-0 flex flex-col h-screen w-fit overflow-y-auto justify-between bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-8">
                {navLinks.map((link)=> {
                    const isActive = currentPath === link.route || currentPath.startsWith(`${link.route}/`)
                    // const isActive = (currentPath === link.route)

                    return <Link href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {'bg-blue-1': isActive})} key={link.route}>
                        <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                        <p className="text-base font-semibold max-lg:hidden">
                        { link.label }
                        </p>
                        </Link>
                })}
            </div>
        </section>
    )
}

export default Sidebar
