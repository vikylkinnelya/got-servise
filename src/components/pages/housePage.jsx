import React, { Component } from 'react';
import gotServise from '../../servises/gotServise';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import RowBlock from '../rowBlock'


export default class HousePage extends Component {

    gotServise = new gotServise();

    state = {
        selectedHouse: null, //какой перс выбран в данный момент
        error: false
    }
    componentDidCatch() { //в случае ошибки
        this.setState({
            error: true //добавляем в стейт ошибку
        })
    }
    onItemSelected = (id) => { //принимает id куда кликнули
        this.setState({ //уст состояние для текущего выбранного перс
            selectedHouse: id //кот уст через id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotServise.getAllHouses}
                renderItem={({ name }) => name} />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getData={this.gotServise.getHouse} >
                    <Field field = 'region' label='Region'/>
                    <Field field = 'words' label='Words'/>
                    <Field field = 'titles' label='Titles'/>
                    <Field field = 'ancestralWeapons' label='Ancestral Weapons'/>

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
