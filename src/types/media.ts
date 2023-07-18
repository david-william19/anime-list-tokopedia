export type TMedia = {
    id: number
    title: {
        romaji: string
    }
    description: string
    coverImage: {
        medium: string
    }
    episodes?: number
    seasonInt?: number;
    duration?: number;
}