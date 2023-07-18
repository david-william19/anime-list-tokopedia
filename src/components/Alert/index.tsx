import styled from "@emotion/styled";

interface IAlertProps {
    variant: "success" | "error";
    message?: string;
}

const Container = styled.div`
    background-color: ${(props: IAlertProps) => props.variant === "success" ? "#079421" : props.variant === "error" ? "#b82b0f": "#010101"};
    border-radius: 10px;
    padding: 10px;
    color: #fff;
`

const Alert: React.FC<IAlertProps> = ({variant, message}) => {
    return (
        <Container variant={variant}>
            <p>{message}</p>
        </Container>
    )
}

export default Alert;