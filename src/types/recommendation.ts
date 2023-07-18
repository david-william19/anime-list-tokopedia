export type TPageRecommendation = {
    Page: {
        recommendations: TRecommendation[];
    }
}

export type TRecommendation = {
    id: number
            mediaRecommendation: {
                id: number
                title: {
                    english: string
                }
                description: string;
                bannerImage: string;
                updatedAt: string
                trending: string
            }
}