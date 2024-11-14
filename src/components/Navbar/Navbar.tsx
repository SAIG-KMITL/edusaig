"use client"

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

function Navbar() {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    const Toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div className='flex bg-trans-white items-center border-b border-t shadow justify-between py-[16px] px-[24px]'>
                <div className='font-bold text-3xl flex ml-5 pointer'>
                    <Link href={"/home"}>edusaig</Link>
                </div>
                <div className='hidden gap-8 items-center font-bold md:flex text-lg'>
                    <Link href={"/home"} className=' hover:text-sky-500 transition px-1'>Home</Link>
                    <Link href={"/course"} className=' hover:text-sky-500 transition px-1'>Course</Link>
                    <Link href={"/roadmap"} className=' hover:text-sky-500 transition px-1'>Roadmap</Link>
                    <Link href={"/reward"} className=' hover:text-sky-500 transition px-1'>Rewards</Link>
                </div>

                {/* Waiting user data */}
                <Link href={"/login"} className='hidden md:flex border px-5 py-2 text-lg bg-trans-white rounded-full border-skyblue transition mr-5 background bg-sky-500 font-semibold text-white hover:bg-sky-700'>Get Started</Link>

                <div className='md:hidden cursor-pointer w-[40px] h-[40px] flex justify-center items-center hover:bg-gray-200 rounded-full' onClick={Toggle}>
                    {isOpen ? <div className='hover:border rounded-circle'>X</div>
                        :
                        <div>
                            <Image
                                src="/icons/menu.svg"
                                width={20}
                                height={20}
                                alt="menu icon"
                            />
                        </div>}
                </div>
            </div>

            {/* Mobile */}
            {isOpen ?
                <div>
                    <div className='md:hidden z-[1] absolute w-[260px] h-full shadow-xl bg-white right-0 transition'>
                        <div className='' onClick={Toggle}>
                            <div className='grid grid-cols-1'>
                                <div className='flex justify-center py-2'><Link href={"/login"} className='border w-[230px] py-2 flex justify-center bg-trans-white rounded-[50px] border-skyblue transition background bg-sky-500 font-semibold text-white hover:bg-sky-700'>Get Started</Link></div>
                                <div className='flex justify-center py-2'><Link href={"/home"} className='w-[230px] flex justify-center py-2 rounded-[50px] hover:bg-gray-200 border-b font-semibold'>Home</Link></div>
                                <div className='flex justify-center py-2'><Link href={"/course"} className='w-[230px] flex justify-center py-2 rounded-[50px] hover:bg-gray-200 border-b font-semibold'>Course</Link></div>
                                <div className='flex justify-center py-2'><Link href={"/roadmap"} className='w-[230px] flex justify-center py-2 rounded-[50px] hover:bg-gray-200 border-b font-semibold'>Roadmap</Link></div>
                                <div className='flex justify-center py-2'><Link href={"/reward"} className='w-[230px] flex justify-center py-2 rounded-[50px] hover:bg-gray-200 border-b font-semibold'>Reward</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute h-full w-full bg-gray-900 opacity-50'/>
                </div>
                : ""
            }
        </div>
    )
}

export default Navbar
