import { MetaType } from "./meta.type";

export type UserOccupationResponseType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type UserOccupationsResponseType = {
  data: UserOccupationResponseType[];
  meta: MetaType;
}