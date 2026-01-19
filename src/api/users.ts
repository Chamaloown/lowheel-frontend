import { httpClient } from "@/api/httpClient";
import type { User } from "@/types/user";
import type { SuccessesByRole } from "./successes";

export async function ensureUser(name: string, tagLine: string): Promise<User> {
    const response = await httpClient.post<User>("/users/user", {
        name,
        tagLine
    });
    return response.data;
}

export async function getUserSuccesses(userId: number): Promise<SuccessesByRole[]> {
    const response = await httpClient.get<any[]>(`/users/successes/${userId}`);
    return response.data;
}