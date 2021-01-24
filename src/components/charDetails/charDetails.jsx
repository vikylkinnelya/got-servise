import React, { Component } from 'react';
import gotServise from '../../servises/gotServise.js';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import './charDetails.css';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span> {/* заголовок */}
            <span>
                {[field]} {/* берем поле из обьекта */}
            </span>
        </li>
    )
}
export {Field} 

export default class CharDetails extends Component {
    gotServise = new gotServise();
    state = {
        char: null
    }

    componentDidMount() {
        //обновление компонента после изменения state
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            //если новое значение не совпадает с предыдущим 
            this.updateChar() //обновляем
        }
    }

    updateChar() {
        const { charId, getData } = this.props //деструктур что приходит из пропсов
        if (!charId) {
            return;
        }
        getData(charId) //обр к серверу по id
            .then((char) => { //получаем оьект с персонажем
                this.setState({ char }) //полученн обьект записываем в char
            })
    }

    render() {
        if (!this.state.char) {
            return <span className='select-error'>Please select item in the list</span>
        }
        const { name, gender, born, died, culture } = this.state.char

        return (
            <div className='char-details rounded'>
                <h4>
                    {name}
                </h4>
                <ul className='list-group list-group-flush'>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}