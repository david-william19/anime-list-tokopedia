import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import { GET_ANIME_LIST } from "../../services/Anime";
import { useParams } from "react-router-dom";
import { TData } from "../../types/data";
import styled from "@emotion/styled";
import SkeletonLoading from "../../components/Skeleton";

const Header = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    object-position: bottom;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    
    .banner-image {
        width: 100%;
        object-fit: cover;
    }

    h4 {
        position: absolute;
        text-align: center;
        color: #fff;
        font-size: 32px;
    }
`

const DescriptionText = styled.p`
    margin: 0 50px;
`

const InfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px 0;

    div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media only screen and (min-width: 600px) {
        flex-direction: row;
    }
`



export function AnimeDetail(){
    const {id} = useParams();

    const {data, loading} = useQuery<TData>(GET_ANIME_LIST, {variables: {id: id}})

    if(loading) {
        return (
            <Layout>
                <Header>
                    <SkeletonLoading width="100%" height="100%" />
                </Header>
            </Layout>
        )
    }
    return(
        <Layout>
            <Header>
            <img className="banner-image" alt="image-detail" src={data!.Page.media[0].coverImage.medium} />
            <h4>{data!.Page.media[0].title.romaji}</h4>
            </Header>
            <DescriptionText className="description-detail" dangerouslySetInnerHTML={{__html: data!.Page.media[0].description}}>
            </DescriptionText>
            <InfoWrapper>
                <div>
                <h3>Episodes &#127916;</h3>
                <p>{data?.Page.media[0].episodes}</p>
                </div>

                <div>
                <h3>Durations &#128337;</h3>
                <p>{data?.Page.media[0].duration} Minutes</p>
                </div>

                <div>
                <h3>Season &#128214;</h3>
                <p>{data?.Page.media[0].seasonInt}</p>
                </div>
            </InfoWrapper>
        </Layout>
    )
}