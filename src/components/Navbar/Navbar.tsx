import Link from 'next/link'

function Navbar() {
    return (
        <div className='flex bg-trans-white items-center border-b border-t shadow justify-between'>
            <div className='font-bold text-3xl flex ml-5 pointer'>
                <Link href={"/home"}>edusaig</Link>
            </div>
            <div className='flex gap-8 items-center font-bold'>
                <Link href={"/home"} className='hover:text-sky-500 transition py-3 px-1'>Home</Link>
                <Link href={"/course"} className='hover:text-sky-500 transition py-3 px-1'>Course</Link>
                <Link href={"/roadmap"} className='hover:text-sky-500 transition py-3 px-1'>Roadmap</Link>
                <Link href={"/rewards"} className='hover:text-sky-500 transition py-3 px-1'>Rewards</Link>
            </div>
                <Link href={"/login"} className='border px-5 py-2 bg-trans-white rounded-full border-skyblue transition mr-5 background bg-sky-500 font-semibold text-white hover:bg-sky-700'>Get Started</Link>
        </div>
    )
}

export default Navbar
