"use server";

export type PostResponseType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function fetchPostAction(): Promise<PostResponseType[]> {
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  try {
    const response = await fetch(`${baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
      },
      next: { revalidate: 3600 },
    });

    const data: PostResponseType[] = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch Nobel prizes:", error);
    throw error;
  }
}
