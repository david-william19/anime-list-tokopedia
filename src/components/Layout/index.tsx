import React from "react";
import Navbar from "../Navbar";
import styled from "@emotion/styled"

interface ILayoutProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Container = styled.div`
    width: 100%;
    padding: 0 20px;
`

const Layout: React.FC<ILayoutProps> = ({children}) => {
    return (
        <>
        <Navbar />
            <Container>
                {children}
            </Container>
        </>
    );
}

export default Layout;