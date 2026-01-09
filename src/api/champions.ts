import { httpClient } from "@/api/httpClient";
import type { Role } from "@/type/role";

export async function getChampions(role: Role | null): Promise<string[]> {
  const response = await httpClient.get<string[]>("/champions", {
    params: role ? { role } : {},
  });
  return response.data;
}
