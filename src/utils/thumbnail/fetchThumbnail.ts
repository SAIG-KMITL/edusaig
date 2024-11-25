const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function fetchThumbnail(id: string) {
  return `${BASE_URL}/course/${id}/thumbnail`;
}
