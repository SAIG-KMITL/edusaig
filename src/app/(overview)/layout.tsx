import BackgroundContainer from "@/components/Containers/BackgroundContainer";
import Footer from "@/components/Navbar/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BackgroundContainer>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </BackgroundContainer>
  );
}
