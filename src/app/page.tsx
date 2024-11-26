import { fetchCoursesAction } from "@/actions/courseAction";
import { fetchUserAction } from "@/actions/userAction";
import Footer from "@/components/Navbar/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { UserResponseType } from "@/types/user.type";
import HomeUI from "./shared/(ui)/HomeUI";

export default async function Home() {
  const user = await fetchUserAction();
  const courses = await fetchCoursesAction();

  console.log(courses.data);
  return (
    <>
      <Navbar user={user.data as UserResponseType} />
      {courses.data ? <HomeUI courses={courses.data} /> : <div>Loading...</div>}
      <Footer />
    </>
  );
}
