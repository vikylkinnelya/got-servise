import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'



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
                <Link to='/'>game of thrones db </Link>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                    <Link to='/characters/'>characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>houses</Link>
                </li>
                <li>
                    <Link to='/books/'>books</Link>
                </li>
            </HeaderLinks>

        </HeaderBlock>
    )
}
export default Header;