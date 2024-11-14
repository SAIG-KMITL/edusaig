import Link from "next/link"
import Image from "next/image"

function Footer() {
    return (
        <div className="flex lg:justify-between justify-center border-t">
            <div className='font-bold text-3xl lg:flex lg:ml-10 pointer mt-6 hidden'>
                <Link href={"/home"}>edusaig</Link>
            </div>
            <div className="mt-6 flex gap-14">
                <div>
                    <h1 className="text-lg font-bold uppercase">follow us</h1>
                    <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-gray-500 mt-3 font-bold text-sm">
                        <Link href={"https://github.com/SAIG-KMITL"} className="hover:underline flex items-center">
                            <Image
                                src="/icons/github.svg"
                                width={20}
                                height={20}
                                alt="github icon"
                                className="mr-1"
                            />
                            Github</Link>
                        <Link href={"https://www.instagram.com/saig.kmitl/"} className="hover:underline flex items-center">
                            <Image
                                src="/icons/instagram.svg"
                                width={20}
                                height={20}
                                alt="ig icon"
                                className="mr-1"
                            />
                            Instagram</Link>
                        <Link href={"https://web.facebook.com/saigkmitl"} className="hover:underline flex items-center">
                            <Image
                                src="/icons/facebook.svg"
                                width={20}
                                height={20}
                                alt="facebook icon"
                                className="mr-1"
                            />
                            Facebook</Link>
                        <Link href={"https://www.tiktok.com/@kmitlofficial?_t=8rIZd9dlVMW&_r=1"} className="hover:underline flex items-center">
                            <Image
                                src="/icons/tiktok.svg"
                                width={20}
                                height={20}
                                alt="tiktok icon"
                                className="mr-1"
                            />
                            Tiktok</Link>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold uppercase">Resources for</h1>
                    <div className="grid md:grid-cols-2 gap-y-4 gap-x-8 text-gray-500 mt-3 font-bold text-sm">
                        <Link href={""} className="hover:underline">Careers</Link>
                        <Link href={""} className="hover:underline">Students</Link>
                        <Link href={""} className="hover:underline">Investors</Link>
                        <Link href={""} className="hover:underline">Developers</Link>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-bold uppercase">legal</h1>
                    <div className="grid gap-y-4 gap-x-8 lg:mr-[100px] text-gray-500 mt-3 font-bold text-sm">
                        <Link href={""} className="hover:underline">Privacy Policy</Link>
                        <Link href={""} className="hover:underline">Terms & Conditions</Link>
                        <Link href={""} className="hover:underline">Cookie Policy</Link>
                        <Link href={""} className="hover:underline">AI Additional Terms of Use</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
