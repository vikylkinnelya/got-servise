import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import RowBlock from '../rowBlock'
import ErrorMessage from '../errorMessage';
import gotServise from '../../servises/gotServise';

export default class BookPage extends Component {

    gotServise = new gotServise();
    state = {
        selectedBook: null, //какой перс выбран в данный момент
        error: false
    }
    componentDidCatch() { //в случае ошибки
        this.setState({
            error: true //добавляем в стейт ошибку
        })
    }
    onItemSelected = (id) => { //принимает id куда кликнули
        this.setState({ //уст состояние для текущего выбранного перс
            selectedBook: id //кот уст через id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotServise.getAllBooks}
                renderItem={({ name }) => `${name}`} />
        )

        const charDetails = (
            <ItemDetails
                itemId={this.state.selectedBook}
                getData={this.gotServise.getBook} >
                    <Field field = 'numberOfPages' label='Number of pages'/>
                    <Field field = 'publiser' label='Publiser'/>
                    <Field field = 'released' label='Released'/>
            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={charDetails}
            />
        )
    }
}
