import React, { Component } from 'react';
//import { Col, Row, Container, Button } from 'reactstrap';
import gotServise from '../../servises/gotServise';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import RowBlock from '../rowBlock'


export default class CharPage extends Component {

    gotServise = new gotServise();
    state = {
        selectedChar: null, //какой перс выбран в данный момент
        error: false
    }
    componentDidCatch() { //в случае ошибки
        this.setState({
            error: true //добавляем в стейт ошибку
        })
    }
    onItemSelected = (id) => { //принимает id куда кликнули
        this.setState({ //уст состояние для текущего выбранного перс
            selectedChar: id //кот уст через id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotServise.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedChar}
                getData={this.gotServise.getCharacter} >
                    <Field field = 'gender' label='Gender'/>
                    <Field field = 'born' label='Born'/>
                    <Field field = 'died' label='Died'/>
                    <Field field = 'culture' label='Culture'/>

            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={itemDetails}
            />
        )
    }
}
