import styled from "@emotion/styled";
import Banner from "../../components/Banner"
import Layout from "../../components/Layout"
import { CollectionContextType, TCollection } from "../../types/collections";
import { AnimeContext } from "../../context/context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";

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
    background-color: #424242;
    padding: 10px;
    border: none;
    border-radius: 10px;
    color: white;
    width: 100%;
    flex: 1;

    &:nth-child(1) {
        margin-bottom: 10px;
    }

    @media only screen and (min-width: 600px) {
        &:nth-child(1) {
            margin-bottom: 0;
        }
    }
`

const CardContainer = styled.div`
    display: grid;
    gap: 15px;
    margin: 15px 0;

    @media only screen and (min-width: 600px) {
        grid-template-columns: auto;

        .text-not-found {
            text-align: center;
            width: 100%;
            place-items: center;
        }

        .button-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            
            a {
                flex: 1;
            }

            @media only screen and (min-width: 600px) {
                margin-bottom: 0;
            }
        }

        .action-container {
            display: flex;
            gap: 10px;
        }
    }
`

const Box = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    position: relative;
    max-width: 600px;
    width: 250px;

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

export function Collections() {
    const {collections, deleteCollection, editCollectionName } = useContext(AnimeContext) as CollectionContextType;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [message, setMessage] = useState("");
    const [titleCollection, setTitleCollection] = useState("");
    const [id, setId] = useState(0);

    const handleDeleteCollection = (id: number) => {
        deleteCollection(id);
    }

    const handleEditCollection = () => {
        editCollectionName(id, titleCollection);
        setMessage("success edit collection")

        setTimeout(() => {
            setMessage("")
        }, 2500)
    }

    return (
        <Layout>
            <Modal isOpen={isOpenModal}>
            <Box>
                {message !== "" && <Alert variant="success" message={message} />}
                <div className="header-box">
                    <CloseButton onClick={() => setIsOpenModal(false)}>&times;</CloseButton>
                    <h3>Edit collection</h3>
                </div>

                <div className="form-collection">
                    <input onChange={(e) => setTitleCollection(e.target.value)} type="text" placeholder="input name here..."></input>
                    <Button onClick={() => handleEditCollection()}>Submit</Button>
                </div>
            </Box>
            </Modal>
            <Banner description="Heres collection that you created &#129321;" />
                    <CardContainer>
                    {
                    collections.length > 0 ?
                    collections.map((data: TCollection) => {
                        return (
                            <CardCollection>
                                <div className="wrapper">
                                {
                                    data.animeCollection.length !== 0 ?
                                    <img className="image-collection" alt="image-collection" src={data.animeCollection[0].coverImage.medium} />
                                    :
                                    <div className="placeholder"></div>
                                }
                                    <h3>{data.title}</h3>
                                </div>
                                <div className="button-container">
                                    <Link to={`/my-collections/${data.id}`}>
                                        <Button>See more</Button>
                                    </Link>
                                    <div className="action-container">
                                    <Button onClick={() => handleDeleteCollection(data.id)}>Delete</Button>
                                    <Button onClick={() => {
                                        setIsOpenModal(!isOpenModal)
                                        setId(data.id)
                                    }}>Edit</Button>
                                    </div>
                                </div>
                            </CardCollection>
                        )
                    })
                    :
                    <p className="text-not-found">collection not found</p>
                }
                    </CardContainer>
        </Layout>
    )
}