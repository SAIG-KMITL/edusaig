import { MetaType } from "./meta.type";

export type RewardType = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  type: string;
  points: number;
  stock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type RewardResponseType = {
  data: RewardType[];
  meta: MetaType;
};


export type RewardOptions = "badge" | "certificate" | "item";

export type RewardStatus = "active" | "inactive";

export type UserRewardType = {
  id: string;
  user: {
    id: string;
    name: string;
  }
  reward: {
    id: string;
    name: string;
  }
  pointsSpent: number;
  status: string;
  redeemedAt: string;
  createdAt: string;
  updatedAt: string;
}
