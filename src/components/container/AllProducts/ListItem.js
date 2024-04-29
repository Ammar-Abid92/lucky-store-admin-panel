import placeholder from '../../../assets/icons/placeholder.png';
import AppDialog from '../../common/AppDialog';
import firebase from '../../../firebase';
import { Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './style.css';

const ListItem = ({ product, handleEdit, index, activePage, toggleItem, setToggleItem }) => {
    const [open, setOpen] = useState(false);
    const db = firebase.firestore();

    const deleteProduct = () => {

    }

    return (
        <>
            <tr onClick={(e) => {
                handleEdit(e, product.id)
                setToggleItem(false)
            }}>

                <td >{(activePage - 1) * 10 + (index + 1)}</td>
                <td className="prdImageBox">
                    <img className="" src={product.images && (Array.isArray(product?.images) && product?.images?.length !== 0) ? product.images[0] : placeholder} />
                </td>
                <td>
                    <p className="productScreenproductName">
                        {product?.item_name}
                    </p>
                </td>
                <td>
                    <p className="productScreenproductName">
                        {product?.category_name}
                    </p>
                </td>
                <td>
                    <p className="productScreenproductName">
                        {product?.quantity}
                    </p>
                </td>
                <td>
                    <p className="productScreenproductName">
                        Rs{" "}{product?.cost_price}
                    </p>
                </td>
                <td>
                    <p className="productScreenproductName">
                        Rs{" "}{product?.selling_price}
                    </p>
                </td>
                <td>
                    <p className="productScreenproductName">
                        Rs{" "}{product?.discount_price}
                    </p>
                </td>
                <td className="tblActionCell">
                    <Dropdown
                        show={toggleItem === product.id} onClick={(e) => {
                            e.stopPropagation()
                            setToggleItem(product.id)
                        }}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basics" active={toggleItem === product.id}  >
                            <span>
                                <i className="moreIcon"></i>
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item onClick={(e) => {
                                handleEdit(e, product.id)
                                setToggleItem(false)
                            }}>
                                <span>
                                    <i className="editIcon"></i>
                                </span>
                                <span>
                                    Edit
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {
                                setToggleItem(false)
                                e.stopPropagation();
                                setOpen(true)
                            }}>
                                <span>
                                    <i className="deleteIcon"></i>
                                </span>
                                <span>
                                    Delete
                                </span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>

            <AppDialog
                handleClose={() => setOpen(false)}
                handleAction={deleteProduct}
                setOpen={setOpen}
                type="delete"
                open={open}
            />
        </>
    )
}

export default ListItem;