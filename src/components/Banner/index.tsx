import styled from "@emotion/styled"
import Modal from "../Modal";

const ContainerHeader = styled.div`
    width: 100%;
    height: 350px;
    padding: 0 10px;
    background: rgb(131,58,180);
    background: linear-gradient(280deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
    padding: 20px 10px;
    border-radius: 10px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
        font-size: 32px;
        text-align: center;
        font-weight: 600;
        margin-bottom: 15px;
        color: #fff;
    }

    .welcome-text {
        background-color: rgba(255,255,255,.5);
        padding: 10px;
        border-radius: 8px;
    }
`

const Banner: React.FC<{description: string}> = ({description}) => {

    return (
        <ContainerHeader>
            <h1 className="title" dangerouslySetInnerHTML={{__html: description}}>
            </h1>

        </ContainerHeader>
    )
}

export default Banner;