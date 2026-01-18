import { httpClient } from "@/api/httpClient";
import type { Champion } from "@/types/champion";

export async function getChampions(role: string): Promise<Champion[]> {
  const response = await httpClient.get<Champion[]>("/champions", {
    params: role ? { role: role.toLowerCase() } : {},
  });
  return response.data;
}
