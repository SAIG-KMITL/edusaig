"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type ApiResponse<T> = {
  data?: T;
  error?: {
    statusCode: number;
    message: string;
  };
};

type RequestConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: object;
  requiresAuth?: boolean;
};

export async function baseApiAction<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", body, requiresAuth = true } = config;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    if (requiresAuth) {
      const cookieStore = cookies();
      const token = (await cookieStore).get("AUTH_TOKEN")?.value;

      if (!token) {
        return {
          error: {
            statusCode: 401,
            message: "Unauthorized - No token provided",
          },
        };
      }

      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          statusCode: response.status,
          message: data.message || "An error occurred",
        },
      };
    }

    return { data: data as T };
  } catch (error) {
    return {
      error: {
        statusCode: 500,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
    };
  }
}
