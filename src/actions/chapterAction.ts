import { ChapterResponseType, ChaptersResponseType } from "@/types/chapter.type";
import { baseApiAction } from "./baseAction";

export async function fetchChapterAction(id: string) {
  return baseApiAction<ChapterResponseType>(`/chapter/${id}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchChaptersAction() {
  return baseApiAction<ChaptersResponseType>(`/chapter?limit=100`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchChaptersByModuleAction(moduleId: string) {
  return baseApiAction<ChapterResponseType[]>(`/chapter/module/${moduleId}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchChaptersWithOwnershipAction() {
  return baseApiAction<ChaptersResponseType>(`/chapter/with-ownership?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchChapterWithOwnershipAction() {
  return baseApiAction<ChapterResponseType>(`/chapter/with-ownership`, {
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

export async function uploadChapterVideoAction(id: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return baseApiAction<void>(`/chapter/${id}/video`, {
    method: "PATCH",
    body: formData,
    requiresAuth: true,
  });
}

export async function deleteChapterAction(id: string) {
  return baseApiAction<ChapterResponseType>(`/chapter/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}
