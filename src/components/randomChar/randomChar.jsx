import React, { Component } from 'react';
import styled from 'styled-components';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`
const RandomBlockTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`

const Term = styled.span`
    font - weight: bold;
`

export default class RandomChar extends Component {
    render() {
        return (
            <RandomBlock className='rounded'>
                <RandomBlockTitle>
                    Random character
                </RandomBlockTitle>
                <ul className='list-group list-group-flush'>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term>
                            Gender
                        </Term>
                        <span>
                            gender
                        </span>
                    </li>
                </ul>
            </RandomBlock>
        )
    }
}
