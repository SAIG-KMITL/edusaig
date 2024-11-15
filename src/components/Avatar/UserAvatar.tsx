import React from 'react';
import Image from 'next/image';

const UserAvatar = ({ profilePic }: { profilePic?: string }) => {
  const defaultAvatar = (
    <svg
      className="h-10 w-10"
      viewBox="0 0 61.7998 61.7998"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30.8999" cy="30.8999" fill="#58b0e0" r="30.8999"/>
      <path d="M23.255 38.68l15.907.146v15.602l-15.907-.147V38.68z" fill="#302e33" fillRule="evenodd"/>
      <path d="M53.478 51.993A30.813 30.813 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A34.072 34.072 0 0 1 15.9 57.919a31.036 31.036 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.31 10.02 7.439 10.113 7.57.113 8.47-5.475 8.47-10.15l12.79 6.282z" fill="#857a6e" fillRule="evenodd"/>
      <path d="M31.462 52.495c-3.342-5.472-9.388-6.287-11.359-6.6-5.42-.86-14.56-4.28-8.564-9.72 10.765-9.764 6.898-22.032 19.513-22.032 13.47 0 8.873 12.268 19.638 22.032 5.997 5.44-3.143 8.86-8.565 9.72a14.292 14.292 0 0 0-10.663 6.6z" fill="#302e33" fillRule="evenodd"/>
      <path d="M39.964 42.252c-1.125 4.01-4.008 6.397-8.598 6.207-3.94-.163-7.297-2.397-8.11-6.204z" fillRule="evenodd" opacity="0.18"/>
      <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z" fill="#ffe8be" fillRule="evenodd"/>
      <path d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658z" fill="#f9dca4" fillRule="evenodd"/>
      <path d="M44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.993 31.993 0 0 0 1.471-7.658z" fill="#f9dca4" fillRule="evenodd"/>
    </svg>
  );

  return (
    <div className="flex justify-center">
      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
        {profilePic ? (
          <Image
            src={profilePic}
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          defaultAvatar
        )}
      </div>
    </div>
  );
};

export default UserAvatar;