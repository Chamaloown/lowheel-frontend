import type { Review } from "@/type/review";
import { httpClient } from "./httpClient";

export async function postReviews(data: Review): Promise<void> {
  return await httpClient.post("/review", data);
}

export async function getReviews(): Promise<Review[]> {
  const response = await httpClient.get<Review[]>("/reviews");
  return response.data;
}
