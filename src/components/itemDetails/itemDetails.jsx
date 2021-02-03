import React, { Component } from 'react';
import './itemDetails.css';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span> {/* заголовок */}
            <span>
                {item[field]} {/* берем поле из обьекта */}
            </span>
        </li>
    )
}
export { Field }

export default class ItemDetails extends Component {
    
    state = {
        item: null
    }

    componentDidMount() {
        //обновление компонента после изменения state
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            //если новое значение не совпадает с предыдущим 
            this.updateItem() //обновляем
        }
    }

    updateItem() {
        const { itemId, getData } = this.props //деструктур что приходит из пропсов
        if (!itemId) {
            return; //ничего
        }
        getData(itemId) //обр к серверу по id
            .then((item) => { //получаем оьект с персонажем
                this.setState({ item }) //полученн обьект записываем в item
            })
    }

    render() {
        if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }
        const { item } = this.state;
        const { name } = item;
        
        return (
            <div className='char-details rounded'>
                <h4>
                    {name}
                </h4>
                <ul className='list-group list-group-flush'>
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        )
    }
}