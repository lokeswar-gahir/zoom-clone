"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { SheetClose } from "@/components/ui/sheet"
import navLinks from "./NavLinkConstants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const MobileNav = () => {
    const currentPath = usePathname()
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger icon"
                        className="cursor-pointer sm:hidden"
                        style={{
                            translate: '0 10%'
                        }}
                        
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-dark-1 max-w-64">
                    <Link href="/" className="flex items-center gap-1">
                        <Image
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="meetUp"
                            className="max-sm:size-10"
                        />
                        <p className="text-[26px] font-extrabold text-white">
                            MeetUp
                        </p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex flex-col gap-6 pt-16 text-white">
                                {navLinks.map((link) => {
                                    
                                    const isActive =
                                        currentPath === link.route ||
                                        currentPath.startsWith(`${link.route}/`)
                                    // const isActive = (currentPath === link.route)

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                className={cn(
                                                    "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                                                    { "bg-blue-1": isActive }
                                                )}
                                            >
                                                <Image
                                                    src={link.imgUrl}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p className="font-semibold">
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
