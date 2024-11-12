import CourseTable from "@/components/Tables/CourseTable";
import { courses } from "@/constants/course";
import { UserResponseType } from "@/types/user.type";
import { formatDate } from "@/utils/format";
import Image from "next/image";

type ProfileUIProps = {
  user: UserResponseType;
};

export default function ProfileUI({ user }: ProfileUIProps) {
  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-blue-400">
            <div className="image overflow-hidden">
              <Image
                className="h-auto w-full mx-auto"
                src="https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {user.fullname}
            </h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">
              Student in our platform.
            </h3>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              Our course uses a smart recommendation system to match your needs
              and goals. We carefully assess your interests and skill level to
              suggest the perfect learning path, ensuring you get the most value
              from your educational journey.
            </p>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Roles</span>
                <span className="ml-auto">
                  <span className="bg-blue-500 py-1 px-2 rounded text-white text-sm">
                    {user.role}
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Member since</span>
                <span className="ml-auto">{formatDate(user.createdAt)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-blue-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">
                    <span>{user.fullname.split(" ")[0]}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">
                    <span>{user.fullname.split(" ")[1]}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">{user.email}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Member Since</div>
                  <div className="px-4 py-2">{formatDate(user.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-sm my-4">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
              <span className="text-blue-500 p-3">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    fill="#fff"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
              <span className="tracking-wide">Course Enrollment</span>
            </div>
            <CourseTable courses={courses} />
          </div>
        </div>
      </div>
    </div>
  );
}
