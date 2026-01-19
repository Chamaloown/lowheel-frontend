import { httpClient } from "@/api/httpClient";

export interface Role {
    id: number
    name: string
}

export async function getRoles(): Promise<Role[]> {
    const response = await httpClient.get<Role[]>(`/roles`)
    return response.data
}