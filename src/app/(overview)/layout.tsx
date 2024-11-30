import { fetchUserAction } from "@/actions/userAction";
import BackgroundContainer from "@/components/Containers/BackgroundContainer";
import Footer from "@/components/Navbar/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { UserResponseType } from "@/types/user.type";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserAction();
  return (
    <BackgroundContainer>
      <Navbar user={user.data as UserResponseType} />
      <div>{children}</div>
      <Footer />
    </BackgroundContainer>
  );
}
