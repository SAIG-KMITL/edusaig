"use server";
import { RoadMapResponseType, RoadMapType } from "@/types/roadmap.type";
import { baseApiAction } from "./baseAction";

export async function fetchRoadMapsAction() {
  return baseApiAction<RoadMapType[]>("/roadmap", {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchRoadmapByUserAction() {
  return baseApiAction<RoadMapResponseType>(`/roadmap/user`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createRoadmapByAiAction(preTestDescription: string) {
  return baseApiAction<RoadMapType>(`/roadmap`, {
    method: "POST",
    requiresAuth: true,
    body: { preTestDescription },
  });
}
