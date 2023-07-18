import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Cards } from "./Card";
import { GET_ANIME_LIST } from "../../services/Anime";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { AnimeContext } from "../../context/context";
import { CollectionContextType, TCollection } from "../../types/collections";
import { TMedia } from "../../types/media";
import { TData } from "../../types/data";
import SkeletonLoading from "../Skeleton";
import Alert from "../Alert";
import Pagination from "../Pagination";

const ContainerCard = styled.div`
    display: grid;
    gap: 15px;
    margin: 0 auto;

    @media only screen and (min-width: 670px){
        grid-template-columns: repeat(4, 1fr);
        width: 70%;
    }
`

const Box = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    max-width: 600px;
    width: 260px;

    @media only screen and (min-width: 600px) {
        width: 660px;
    }
    .header-box {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .form-collection {
        display: flex;
        flex-direction: column;
        gap: 10px;

        input {
            padding: 10px;
        }
    }

    .container-collection {
        display: grid;
        gap: 15px;
        margin-top: 15px;
        overflow: auto;
        max-height: 320px;
    }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
`;

const Button = styled.button`
    background-color: #444444;
    padding: 10px;
    border: none;
    border-radius: 10px;
    color: white;
    width: 100%;
`

const CardCollection = styled.div`
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid #bfbfbf;

    .placeholder {
        background-color: #bfbfbf;
        width: 100%;
        height: 120px;
    }

    .image-collection{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }

    h3 {
        margin-bottom: 15px;
    }
`

const WrapperBulk = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`

const AnimeList: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const [titleCollection, setTitleCollection] = useState("");
    const [anime, setAnime] = useState<TMedia | null>(null);
    const [message, setMessage] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const {collections, createCollection, saveToCollection, bulkToCollection } = useContext(AnimeContext) as CollectionContextType;
    const { loading, data: animeList } = useQuery<TData>(GET_ANIME_LIST, {variables: {page: pageNumber, perPage: 20 }});
    const [selectedAnime, setSelectedAnime] = useState<TMedia[]>([]);
    const [isBulk, setIsBulk] = useState(false);

    const handleOpenModal = (data: TMedia) => {
        setOpenModal(true);
        console.log("open-modal: ",data)
        setAnime(data)
    }

    const handlePageChange = (pageNumber: number) => {
        setPageNumber(pageNumber)
      };

    const submitNewCollection = () => {
        createCollection(titleCollection);
        setMessage("success create new collection")
        setTimeout(() => {
            setMessage("")
        }, 2000)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const animeItem = animeList!.Page.media.find((anime) => anime.id.toString() === value);
        if (animeItem) {
          setSelectedAnime((prevSelectedAnime) =>
            prevSelectedAnime.includes(animeItem)
              ? prevSelectedAnime.filter((item) => item.id !== animeItem.id)
              : [...prevSelectedAnime, animeItem]
          );
        }
      };

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    useEffect(() => {
        // Update the totalItems and currentPage when the data changes
        if (animeList && animeList.Page.pageInfo) {
          setPageNumber(animeList.Page.pageInfo.currentPage);
        }

        console.log(pageNumber)
      }, [animeList, pageNumber]);

    if(loading) {
        return (
            <ContainerCard>
                {
                    [1,2,3,4].map(() => {
                        return (
                            <div>
                                <SkeletonLoading width="100%" height="200px" />
                                <SkeletonLoading width="100%" height="20px" />
                                <SkeletonLoading width="100%" height="15px" />
                                <SkeletonLoading width="100%" height="15px" />
                            </div>
                        )
                    })
                }
            </ContainerCard>
        )
    }
    return (
        <div>
            {/* bulk button */}
        {
            !isBulk ?
            (
                <div>
                    <Button onClick={() => setIsBulk(!isBulk)}>Choose multiple Anime</Button>
                </div>
            )
            :
            (
                <WrapperBulk>
                    <Button onClick={() => setOpenModal(!openModal)}>Choose collection</Button>
                    <Button onClick={() => {
                        setIsBulk(!isBulk)
                        setSelectedAnime([]);
                    }}>Cancel</Button>
                </WrapperBulk>
            )
        }
        <ContainerCard>
            {collections && <Modal isOpen={openModal}>
            <Box>
                {message !== "" && <Alert variant="success" message={message} />}
                <div className="header-box">
                    <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                    <h3>Collection</h3>
                </div>
                <div className="form-collection">
                    <input onChange={(e) => setTitleCollection(e.target.value)} type="text" placeholder="input name collection here..."></input>
                    <Button onClick={() => submitNewCollection()}>Submit</Button>
                </div>

                <div className="container-collection">
                    {collections.map((data: TCollection) => {
                        return (
                            <CardCollection>
                                {
                                    data.animeCollection.length !== 0 ?
                                    <img className="image-collection" alt="image-collection" src={data.animeCollection[0].coverImage.medium} />
                                    :
                                    <div className="placeholder"></div>
                                }
                                <h3>{data.title}</h3>
                                <Button onClick={() => {
                                    if(selectedAnime.length !== 0){
                                        bulkToCollection(data.id, selectedAnime);
                                    } else {
                                        saveToCollection(anime!, data.id)
                                    }
                                    setMessage("success add to collection")
                                    setTimeout(() => {
                                        setMessage("")
                                    }, 2000)
                                }
                                }>add to collection</Button>
                            </CardCollection>
                        )
                    })}
                </div>
            </Box>
        </Modal>}
        {/* <Card /> */}
            {animeList && animeList.Page.media.map((data: TMedia) => {
                return (
                    <Cards isBulk={isBulk} isChecked={selectedAnime.includes(data)} handleCheckboxChange={handleCheckboxChange} isOpenModal={() => handleOpenModal(data)} id={data.id} key={data.id} loading={loading} image={data.coverImage.medium} title={data.title.romaji} description={data.description} />
                )
            })}
        </ContainerCard>
        {/* pagination */}
        {animeList && <Pagination 
            totalItems={animeList.Page.pageInfo.total}
            itemsPerPage={animeList.Page.pageInfo.perPage}
            onPageChange={handlePageChange}
        />}
        </div>
    )
}

export default AnimeList;