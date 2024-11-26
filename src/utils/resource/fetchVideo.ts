// export funct
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function fetchVideo(id: string) {
  return `${BASE_URL}/chapter/${id}/video`;
}
