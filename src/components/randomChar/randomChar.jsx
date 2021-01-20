import React, { Component } from 'react';
import styled from 'styled-components';
import GotServise from '../../servises/gotServise.js';
import Spinner from '../spinner';


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

    constructor() {
        super();
        this.updateChar(); //когда будет создан класс, сразу же будет вызан этот метод
    }

    gotServise = new GotServise();
    state = {
        char: {},
        loading: true,
        error: false
    }

    
    updateChar() {
        const id = Math.floor(Math.random() * 140 + 25); //от 25 до 140 
        this.gotServise.getCharacter(id) //promise
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false //когда персонаж загрузился, меняется состояние загр
        })
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }


    render() {

        const { char, loading } = this.state; //деструктуризация

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <Viev char={char}/> : null;
        

        return (
            <RandomBlock className='rounded'>
                {spinner}
                {content}
            </RandomBlock>
        )
    }
}

const Viev = ({ char }) => {
    const {  name, gender, born, died, culture  } = char; //деструктуризация
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
