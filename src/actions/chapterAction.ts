import { ChapterResponseType } from "@/types/chapter.type";
import { baseApiAction } from "./baseAction";

export async function fetchChapterAction(id: string) {
  return baseApiAction<ChapterResponseType>(`/chapter/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchChaptersAction(page?: number, limit?: number, search?: string) {
  return baseApiAction<{ data: ChapterResponseType[] }>(`/chapter
    ${page || limit || search ? "?" : ""}
    ${page ? `page=${page}` : ""}
    ${limit ? `limit=${limit}` : ""}
    ${search ? `search=${search}` : ""}`, {
    method: "GET",
    requiresAuth: true,
  });
}


export async function createChapterAction(
  title: string,
  description: string,
  content: string,
  summary: string,
  duration: number,
  moduleId: string,
  isPreview: boolean,
  ) {
  return baseApiAction<ChapterResponseType>(`/chapter`, {
    method: "POST",
    body: { title, description, content, summary, duration, moduleId, isPreview },
    requiresAuth: true,
  }); 
}

export async function editChapterAction(id: string, orderIndex: string, videoKey: string) {
  return baseApiAction<ChapterResponseType>(`/chapter/${id}`, {
    method: "PATCH",
    body: { orderIndex, videoKey },
    requiresAuth: true,
  });
}

export async function deleteChapterAction(id: string) {
  return baseApiAction<ChapterResponseType>(`/chapter/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}
