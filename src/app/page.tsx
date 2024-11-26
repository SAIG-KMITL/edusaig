import { fetchCourseMostEnrollAction } from "@/actions/courseAction";
import { fetchUserAction } from "@/actions/userAction";
import Footer from "@/components/Navbar/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { UserResponseType } from "@/types/user.type";
import HomeUI from "./shared/(ui)/HomeUI";
import {fetchCatsAction } from "@/actions/categoryAction";

export default async function Home() {
  const user = await fetchUserAction();
  const coursesPopular = await fetchCourseMostEnrollAction();
  const categories = await fetchCatsAction()
  return (
    <>
      <Navbar user={user.data as UserResponseType} />
      {coursesPopular.data && categories.data ? <HomeUI courses={coursesPopular.data} cats={categories.data}/> : <div>Loading...</div>}
      <Footer />
    </>
  );
}
