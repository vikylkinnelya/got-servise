import React, {Component} from 'react';

export default class ItemList extends Component {
    render() {
        return (
            <ul className='item-list list-group' >
                <li className='list-group-item'  cursor= 'pointer'>
                    character
                </li>
            </ul>

        )
    }
}
