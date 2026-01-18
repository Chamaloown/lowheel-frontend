import { httpClient } from "@/api/httpClient";

export async function getSuccesses(role: string): Promise<string[]> {
  const response = await httpClient.get<string[]>("/successes", {
    params: role ? { role } : {},
  });
  return response.data;
}
