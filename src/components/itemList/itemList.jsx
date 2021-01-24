import React, { Component } from 'react';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import './itemList.css';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() { //когда компонент будет проинициализирован
        const {getData} = this.props; //берем из уровня выше из апп
        
        getData()
            .then( (itemList) => {
                this.setState({
                    itemList, //обьект получит список всех персонажей
                    error: false
                })
            })
    }

    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) { 
        //передается в комп для рендеринга части его содержимого
        //еще больше контрол комп извне
        return arr.map((item) => {
            const {id} = item
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id} //если созд элемент реакта перебором, должен быть ключ
                    className='list-group-item'
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList, error } = this.state;

        if (!itemList) { //если пока нет списка
            return <Spinner /> //показываем загрузку
        }
        if (error) {
            return <ErrorMessage/>
        }
        const items = this.renderItems(itemList);

        return (
            <ul className='item-list list-group' >
                {items}
            </ul>
        )
    }
}
