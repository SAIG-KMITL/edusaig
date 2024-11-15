import { UserManagementType } from "@/types/userManagement";
import profilePicture01 from "../../public/pictures/profile-picture-01.svg"
import profilePicture02 from "../../public/pictures/profile-picture-02.svg"
import profilePicture03 from "../../public/pictures/profile-picture-03.svg"
import profilePicture04 from "../../public/pictures/profile-picture-04.svg"
import profilePicture05 from "../../public/pictures/profile-picture-05.svg"

type UserManagementOptions = {
  id: string;
  label: string;
  count: number;
};

export const userManagementInfomation: UserManagementType[] = [
  {
    profilePic: profilePicture01,
    emailAddress: "john.doe@example.com",
    provider: "Google",
    createdDate: "2023-01-15T10:25:00Z",
    lastSignIn: "2023-11-10T15:40:00Z",
    userUID: "uid123456789"
  },
  {
    profilePic: profilePicture02,
    emailAddress: "jane.smith@example.com",
    provider: "Email",
    createdDate: "2022-09-05T12:10:00Z",
    lastSignIn: "2023-11-12T09:20:00Z",
    userUID: "uid987654321"
  },
  {
    profilePic: profilePicture03,
    emailAddress: "michael.jordan@example.com",
    provider: "Facebook",
    createdDate: "2021-06-25T08:30:00Z",
    lastSignIn: "2023-10-30T14:00:00Z",
    userUID: "uid246813579"
  },
  {
    profilePic: profilePicture04,
    emailAddress: "emily.watson@example.com",
    provider: "Twitter",
    createdDate: "2022-11-17T16:50:00Z",
    lastSignIn: "2023-11-13T18:30:00Z",
    userUID: "uid135791357"
  },
  {
    profilePic: profilePicture05,
    emailAddress: "brad.pitt@example.com",
    provider: "Apple",
    createdDate: "2023-03-02T11:45:00Z",
    lastSignIn: "2023-11-14T12:15:00Z",
    userUID: "uid192837465"
  },
  {
    profilePic: profilePicture01,
    emailAddress: "susan.collins@example.com",
    provider: "Google",
    createdDate: "2021-02-10T07:15:00Z",
    lastSignIn: "2023-11-11T17:05:00Z",
    userUID: "uid364728192"
  },
  {
    profilePic: profilePicture02,
    emailAddress: "david.lee@example.com",
    provider: "Email",
    createdDate: "2020-07-19T05:50:00Z",
    lastSignIn: "2023-11-12T13:30:00Z",
    userUID: "uid817263545"
  },
  {
    profilePic: profilePicture03,
    emailAddress: "anna.brown@example.com",
    provider: "Twitter",
    createdDate: "2023-08-05T09:00:00Z",
    lastSignIn: "2023-11-14T08:45:00Z",
    userUID: "uid475839201"
  },
  {
    profilePic: profilePicture04,
    emailAddress: "chris.evans@example.com",
    provider: "Facebook",
    createdDate: "2021-05-11T15:30:00Z",
    lastSignIn: "2023-10-28T21:10:00Z",
    userUID: "uid958674310"
  },
  {
    profilePic: profilePicture05,
    emailAddress: "lisa.kudrow@example.com",
    provider: "Email",
    createdDate: "2019-12-23T14:15:00Z",
    lastSignIn: "2023-11-10T11:55:00Z",
    userUID: "uid102938475"
  },
  {
    profilePic: profilePicture01,
    emailAddress: "tom.hardy@example.com",
    provider: "Apple",
    createdDate: "2022-04-14T10:00:00Z",
    lastSignIn: "2023-11-13T16:30:00Z",
    userUID: "uid829475102"
  },
  {
    profilePic: profilePicture02,
    emailAddress: "natalie.portman@example.com",
    provider: "Google",
    createdDate: "2021-09-09T18:40:00Z",
    lastSignIn: "2023-11-12T19:00:00Z",
    userUID: "uid657483920"
  },
  {
    profilePic: profilePicture03,
    emailAddress: "steve.carell@example.com",
    provider: "Email",
    createdDate: "2020-06-02T07:20:00Z",
    lastSignIn: "2023-11-11T14:20:00Z",
    userUID: "uid203948576"
  },
  {
    profilePic: profilePicture04,
    emailAddress: "julia.roberts@example.com",
    provider: "Facebook",
    createdDate: "2023-01-31T11:25:00Z",
    lastSignIn: "2023-11-13T17:50:00Z",
    userUID: "uid647192837"
  },
  {
    profilePic: profilePicture05,
    emailAddress: "robert.downey@example.com",
    provider: "Twitter",
    createdDate: "2022-03-22T08:30:00Z",
    lastSignIn: "2023-11-14T20:10:00Z",
    userUID: "uid293847562"
  }
];

export const userManagementOptions: UserManagementOptions[] = [
  {
    id: "gmail",
    label: "Gmail",
    count: 15,
  },
  {
    id: "yahoo",
    label: "Yahoo Mail",
    count: 5,
  },
  {
    id: "outlook",
    label: "Outlook",
    count: 8,
  },
  {
    id: "icloud",
    label: "iCloud Mail",
    count: 4,
  },
  {
    id: "aol",
    label: "AOL Mail",
    count: 2,
  },
  {
    id: "protonmail",
    label: "ProtonMail",
    count: 3,
  },
  {
    id: "zoho",
    label: "Zoho Mail",
    count: 2,
  },
  {
    id: "yandex",
    label: "Yandex Mail",
    count: 1,
  },
  {
    id: "gmx",
    label: "GMX Mail",
    count: 1,
  },
  {
    id: "mail_com",
    label: "Mail.com",
    count: 2,
  }
];

