import React, { Component } from 'react';
import gotServise from '../../servises/gotServise';
import ItemDetails, { Field } from '../itemDetails';

export default class BooksItem extends Component {

    gotServise = new gotServise();
    
    render() {
        return (
            <ItemDetails
                itemId={this.props.bookID}
                getData={this.gotServise.getBook} >
                <Field field='numberOfPages' label='Number of pages' />
                <Field field='publiser' label='Publiser' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}