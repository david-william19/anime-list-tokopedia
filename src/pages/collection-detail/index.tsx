import styled from "@emotion/styled";
import Banner from "../../components/Banner"
import Layout from "../../components/Layout"
import { CollectionContextType } from "../../types/collections";
import { AnimeContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SkeletonLoading from "../../components/Skeleton";
import { TMedia } from "../../types/media";

const CardCollection = styled.div`
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid #bfbfbf;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .placeholder {
        background-color: #bfbfbf;
        width: 100%;
        height: 200px;
        border-radius: 10px;
    }

    .image-collection{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .wrapper {
        h3 {
            margin: 10px 0;
        }
    }
`

const Button = styled.button`
    background-color: #333333;
    padding: 10px;
    border: none;
    border-radius: 10px;
    color: white;
    width: 100%;
    flex: 1;
`

const CardContainer = styled.div`
    display: grid;
    gap: 15px;
    margin-top: 15px;

    .button-wrapper {
        display: flex;
        gap: 10px;
    }

    a {
        flex: 1;
    }

    @media only screen and (min-width: 600px) {
        grid-template-columns: repeat(4, 1fr);
    }
`

export function CollectionDetail() {
    const {id} = useParams();
    const idCollection = parseInt(id!);
    const [loading, setLoading] = useState(false);
    const [collectionDetail, setCollectionDetail] = useState<TMedia[]>([]);
    const { getCollectionById, deleteFromCollection } = useContext(AnimeContext) as CollectionContextType;

    useEffect(() => {
        setLoading(true)
        if(id){
            getCollectionById(parseInt(id)).then(res => {
                setLoading(false)
                setCollectionDetail(res)
            }).catch(err => console.log(err))
        }

    }, [getCollectionById, id])

    if(loading) {
        return (
            <Layout>
                <Banner description="Heres collection that you created &#129321;" />
                <CardContainer>
                    {
                        [1,2,3,4].map((_, index) => {
                            return (
                                <CardCollection key={index} >
                                    <SkeletonLoading width="100%" height="200px" />
                                    <SkeletonLoading width="100%" height="50px" />
                                </CardCollection>
                            )
                        })
                    }
                </CardContainer>
            </Layout>
        )
    }

    return (
        <Layout>
            <Banner description="Heres collection that you created &#129321;" />
                    <CardContainer key={id}>
                    {collectionDetail.map((data: TMedia) => {
                        return (
                            <CardCollection key={data?.id}>
                                <div className="wrapper">
                                    <img className="image-collection" alt="image-collection" src={data?.coverImage?.medium} />
                                    <h3>{data?.title?.romaji}</h3>
                                </div>
                                <div className="button-wrapper">
                                <Link to={`/anime-detail/${data?.id}`}>
                                    <Button>See more</Button>
                                </Link>
                                <Button onClick={() => deleteFromCollection(data.id, idCollection)}>
                                    Delete
                                </Button>
                                </div>
                            </CardCollection>
                        )
                    })}
                    </CardContainer>
        </Layout>
    )
}