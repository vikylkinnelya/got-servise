import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    aligh-items: center;
    height: 80px;    
`
const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderTitle>
                <a href="#">
                    game of thrones db
                </a>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                    <a href='#'>characters</a>
                </li>
                <li>
                    <a href='#'>houses</a>
                </li>
                <li>
                    <a href='#'>books</a>
                </li>
            </HeaderLinks>

        </HeaderBlock>
    )
}
export default Header;