import React, { useState, useEffect, Component } from 'react';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import './itemList.css';
import PropTypes from 'prop-types';
import gotServise from '../../servises/gotServise.js';


function ItemList({ getData, onItemSelected, renderItem }) {

    const [itemList, updateList] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })

    }, [])

    function renderItems(arr) {
        //передается в комп для рендеринга части его содержимого
        //еще больше контрол комп извне
        return arr.map((item) => {
            const { id } = item
            const label = renderItem(item);
            return (
                <li
                    key={id} //если созд элемент реакта перебором, должен быть ключ
                    className='list-group-item'
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    const items = renderItems(itemList); //здесь лежит верстка с необходимыми эл кот нужно поместить на страницет 

    return (
        <>
            <ul className='item-list list-group' >
                {!itemList && <Spinner />}
                {items}
            </ul>
        </>
    )
}

ItemList.defaultProps = {
    onItemSelected: () => { }
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
    //getData: PropTypes.arrayOf(PropTypes.object) //массив кот будет сост из обьектов
}

const withData = (View) => {

    return (
        <>
            {View.error && <ErrorMessage />}
            {!View.data && <Spinner />}
            <View {...{View}} />
        </>
    )
}
const { getAllCharacters } = new gotServise();
export default withData(ItemList, getAllCharacters)