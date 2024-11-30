import { MetaType } from "./meta.type";
import { UserResponseType } from "./user.type";
import { UserBackgroundTopicResponseType } from "./userBackgroundTopic.type";
import { UserOccupationResponseType } from "./userOccupation.type";

export type UserBackgroundResponseType = { 
  id: string;
  user: UserResponseType;
  occupation: UserOccupationResponseType;
  topics: UserBackgroundTopicResponseType[];
  createdAt: string;
  updatedAt: string;
}

export type UserBackgroundsResponseType = { 
  data: UserBackgroundResponseType[];
  meta: MetaType;
}