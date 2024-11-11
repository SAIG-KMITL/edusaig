import Link from "next/link"

function Footer() {
    return (
        <div className="flex lg:justify-between justify-center border-t mb-5">
            <div className='font-bold text-3xl lg:flex lg:ml-10 pointer mt-6 hidden'>
                <Link href={"/home"}>edusaig</Link>
            </div>
            <div className="mt-6 flex gap-14">
                <div>
                    <h1 className="text-lg font-bold uppercase">follow us</h1>
                    <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-gray-500 mt-3 font-bold">
                        <Link href={"https://github.com/SAIG-KMITL"} className="hover:underline">Github</Link>
                        <Link href={"https://www.instagram.com/saig.kmitl/"} className="hover:underline">Instagram</Link>
                        <Link href={"https://web.facebook.com/saigkmitl"} className="hover:underline">Facebook</Link>
                        <Link href={"https://www.tiktok.com/@kmitlofficial?_t=8rIZd9dlVMW&_r=1"} className="hover:underline">Tiktok</Link>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold uppercase">Resources for</h1>
                    <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-gray-500 mt-3 font-bold">
                        <Link href={""} className="hover:underline">Careers</Link>
                        <Link href={""} className="hover:underline">Students</Link>
                        <Link href={""} className="hover:underline">Investors</Link>
                        <Link href={""} className="hover:underline">Developers</Link>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold uppercase">legal</h1>
                    <div className="grid gap-y-4 gap-x-8 lg:mr-[100px] text-gray-500 mt-3 font-bold">
                        <Link href={""} className="hover:underline">Privacy Policy</Link>
                        <Link href={""} className="hover:underline">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
