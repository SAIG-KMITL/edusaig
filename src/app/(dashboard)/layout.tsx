import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Navbar/Footer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar/>
            <div>
                {children}
            </div>
            <Footer/>
        </>
    );
}