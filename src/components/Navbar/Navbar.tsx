"use client"

import Link from 'next/link'
import { useState } from 'react'

function Navbar() {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    const Toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='flex bg-trans-white items-center border-b border-t shadow justify-between py-1'>
            <div className='font-bold text-3xl flex ml-5 pointer'>
                <Link href={"/home"}>edusaig</Link>
            </div>
            <div className='hidden gap-8 items-center font-bold md:flex'>
                <Link href={"/home"} className='hover:text-sky-500 transition px-1'>Home</Link>
                <Link href={"/course"} className='hover:text-sky-500 transition px-1'>Course</Link>
                <Link href={"/roadmap"} className='hover:text-sky-500 transition px-1'>Roadmap</Link>
                <Link href={"/reward"} className='hover:text-sky-500 transition px-1'>Rewards</Link>
            </div>
            {/* Waiting user data */}
            <Link href={"/login"} className='hidden md:flex border px-5 py-1 bg-trans-white rounded-full border-skyblue transition mr-5 background bg-sky-500 font-semibold text-white hover:bg-sky-700'>Get Started</Link>

            {/* Mobile */}
            <div className='md:hidden cursor-pointer pr-4'>
                {isOpen ?
                    <div className='w-[260]' onClick={Toggle}>
                        <ul>
                            <li><Link href={"/login"}>Login</Link></li>
                            <li><Link href={"/home"}>Home</Link></li>
                            <li><Link href={"/course"}>Course</Link></li>
                            <li><Link href={"/roadmap"}>Roadmap</Link></li>
                            <li><Link href={"/reward"}>Reward</Link></li>
                        </ul>
                    </div>
                    :
                    <div onClick={Toggle}>
                        | o |
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
