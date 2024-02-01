import React from 'react';
import { logout } from '../../../oscar-pos-core/actions';

const LeftActions = ({ history }) => {

    return (
        <div className="col-sm-3">
            <div className="leftSectionNav">
                <h1>Dashboard</h1>
                <button
                    onClick={() => history.push('/Home')}
                >Home</button>
                <button
                    onClick={() => history.push('/AddProduct')}
                >Add Item</button>
                <button
                    onClick={() => history.push('/AddBulkProducts')}
                >Add Bulk Items</button>
                <button
                    onClick={() => history.push('/AddCategory')}
                >Add Category</button>
                <button
                    onClick={() => history.push('/AllItems')}
                >All Items</button>
                <button
                    onClick={() => history.push('/AllCategories')}
                >All Categories</button>
                <button
                    onClick={() => history.push('/EditBusinessDetails')}
                >Edit Business Details</button>
                <button
                    onClick={() => {
                        logout().then(res => {
                            history.push('/');
                        })
                    }}
                >Logout</button>
            </div>
        </div>
    )
}

export default LeftActions;