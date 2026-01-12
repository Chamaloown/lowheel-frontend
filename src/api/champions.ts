import { httpClient } from "@/api/httpClient";

export async function getChampions(role: string): Promise<string[]> {
  const response = await httpClient.get<string[]>("/champions", {
    params: role ? { role } : {},
  });
  return response.data;
}
