import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

const NavbarContainer = styled.div`
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;

    img {
        width: 70px;
    }

    @media only screen and (min-width: 600px) {
        img {
            display: block;
            width: 90px;
        }
    }

    .nav-items {
        display: none;

        @media only screen and (min-width: 600px) {
            display: flex;
            gap: 15px;
        
            a {
                text-decoration: none;
                color: #000;

                    &:hover {
                        color: #c7390e;
                        transition: all 10ms ease-in;
                    }
                }
            }
    }
`

const SearchInput = styled.input`
    border-radius: 10px;
    padding: 10px;
    max-width: 500px;
    text-align: center;
`

const MenuButton = styled.button`
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        img {
            width: 10px;
        }
    @media only screen and (min-width: 600px) {
        display: none;
    }
`

const PopUpMenu = styled.div`
    position: absolute;
    top: 80px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #bfbfbf;

    a {
        text-decoration: none;
        color: #000;
    }
`

const Navbar: React.FC = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const MenuContainer = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    return (
        <NavbarContainer>
            <Link to={"/"}>
                <img alt="logo" src="/public/icons/logo.svg" />
            </Link>
            <div className="nav-items">
                <Link to={'/my-collections'}>My collections</Link>
            </div>
            
            {/* mobile menu */}
            <MenuButton onClick={MenuContainer}>
                <img alt="menu-icon" src="/public/icons/menu-icon.png" />
            </MenuButton>
            {
                isOpenMenu &&
                <PopUpMenu>
                    <Link to={'/my-collections'}>My collections</Link>
                </PopUpMenu>
            }
        </NavbarContainer>
    )
}

export default Navbar;