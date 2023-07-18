import { gql } from "@apollo/client";


export const GET_ANIME_LIST = gql(`
  query GetAnimeList($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
        id
        title {
          romaji
        }
        description
        coverImage {
            medium
        }
        seasonInt
        episodes
        duration
      }
    }
  }
  `)

  export const GET_ANIME_RECOMENDATION = gql(`
  query ($page: Int, $perPage: Int, $rating_greater:Int) {
    Page(page: $page, perPage: $perPage){
      recommendations(rating_greater: $rating_greater) {
        id
        mediaRecommendation {
          id
          title {
            english
          }
          description
          bannerImage
          updatedAt
          trending
        }
      }
    }
  }  
  `)