import styled from "@emotion/styled";
import { Link } from "react-router-dom";

interface CardProps {
    id: number
    title?: string;
    description?: string;
    image?: string;
    loading?: boolean;
    isOpenModal: () => void;
    isChecked: boolean;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isBulk: boolean;
}

type CardStyledProps = {
    isLoading?: boolean;
}

const Card = styled.div`
    padding: 20px;
    border-radius: 10px;
    width: 100%;

    h1 {
        font-size: 26px;
        margin: 10px 0;
    }
`

const ImageCard = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    background-position: center center;
    border-radius: 5px;
    background-color: ${(props: CardStyledProps) => props.isLoading && '#b3b3b3'};

    img {
        width: 100%;
    }

    input {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
    }
`

const ButtonAddCollection = styled.button`
    border-radius: 100%;
    min-width: 20px;
    min-height: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 10;
    padding: 10px;
    border: none;

    .add-folder-icon {
        max-width: 24px;
        max-height: 24px;
    }
`

const LinkAnime = styled(Link)`
    color: black;
    text-decoration: none;
`

export function Cards(props: CardProps) {

    if(props.loading) {
        return (
            <Card>
                <ImageCard isLoading={props.loading} />
                <p>loading</p>
            </Card>
        )
    }
    return (
        <Card>
            <ImageCard>
                {props.isBulk && <input
                    type="checkbox"
                    value={props.id}
                    checked={props.isChecked}
                    onChange={props.handleCheckboxChange}
                />}
                <img alt="cover-image-card" src={props.image} />
                <ButtonAddCollection onClick={props.isOpenModal}>
                    <img className="add-folder-icon" alt="icon" src="/icons/add-folder.svg" />
                </ButtonAddCollection>
            </ImageCard>
            <LinkAnime to={`anime-detail/${props.id}`}>
                <h1>{props.title}</h1>
                <p>{props.description?.slice(0, 50)}...</p>
            </LinkAnime>
        </Card>
    )
}