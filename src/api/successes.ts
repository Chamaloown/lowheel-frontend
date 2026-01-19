import { httpClient } from "@/api/httpClient";

export interface SuccessesByRole {
    adc: ChampionsByRole[]
    jungle: ChampionsByRole[]
    mid: ChampionsByRole[]
    top: ChampionsByRole[]
    support: ChampionsByRole[]
}

export interface ChampionsByRole {
    id: number
    champion: Champion
    isCompleted: boolean
}

export interface Champion {
    id: number
    name: string
    imgUrl?: string
}


export async function getSuccesses(userId: number): Promise<SuccessesByRole> {
    const response = await httpClient.get<SuccessesByRole>(`/successes/${userId}`)
    return response.data
}

export async function verify(userId: number, champion: number, role: number): Promise<any> {
    const response = await httpClient.patch<any>(`/successes/verify`, {
        userId,
        champion,
        role
    })
    return response.data
}