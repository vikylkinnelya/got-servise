import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotServise from '../../servises/gotServise';
import {withRouter} from 'react-router-dom'

class BookPage extends Component {

    gotServise = new gotServise();

    state = {
        error: false
    }
    componentDidCatch() { //в случае ошибки
        this.setState({
            error: true //добавляем в стейт ошибку
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotServise.getAllBooks}
                renderItem={({ name }) => name} />
        )
    }
}

export default withRouter(BookPage);
