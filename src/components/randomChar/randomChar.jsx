import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import gotServise from '../../servises/gotServise.js';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'
import PropTypes from 'prop-types';

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

const { getCharacter } = new gotServise();

function RandomChar({ interval }) {

    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    /* static defaultProps = {
        interval: 15000
    } */

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, interval); //обновление персонажа каждые н секунд, кот передаются извне
        return (
            clearInterval(timerId)
        )
    }, [])

    const updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25); //от 25 до 140 
        //const id = 12345678950
        getCharacter(id) //promise
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)//когда персонаж загрузился, меняется состояние загр
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <Viev char={char} /> : null;

    return (
        <RandomBlock className='random-block rounded'>
            {errorMessage}
            {spinner}
            {content}
        </RandomBlock>
    )
}

RandomChar.defaultProps = {
    interval: 1500
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const Viev = ({ char }) => {
    const { name, gender, born, died, culture } = char; //деструктуризация
    return (
        <>
            <RandomBlockTitle>
                Character: {name}
            </RandomBlockTitle>
            <ul className='list-group list-group-flush'>
                <li className="list-group-item d-flex justify-content-between">
                    <Term> Gender </Term>
                    <span> {gender} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term> born </Term>
                    <span> {born} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term> died </Term>
                    <span> {died} </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term> culture </Term>
                    <span> {culture} </span>
                </li>
            </ul>
        </>
    )

}

export default RandomChar