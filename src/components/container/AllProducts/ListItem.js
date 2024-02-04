import { deleteDukaanProductToCloud, updateDukaanProductStatusToCloud } from '../../../oscar-pos-core/actions';
import { BASE_URL, CUSTOMER_BASE_URL } from '../../../constants';
import placeholder from '../../../assets/icons/placeholder.png';
import { PRODUCT } from '../../../oscar-pos-core/actions/types';
import { formatNum } from '../../../oscar-pos-core/constants';
import AppDialog from '../../common/AppDialog';
import { analytics } from '../../../firebase';
import { Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { store } from '../../../store';
import './style.css';
import useGetCollectionData from '../../../hooks/getData';

const ListItem = ({ product, user, handleEdit, index, activePage, toggleItem, setToggleItem }) => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");

    const categories = useGetCollectionData('categories');
    useEffect(() => {
        if (categories?.length > 0) {
            categories?.forEach((categ) => {
                if (categ?.id === product?.category_id) {
                    setCategory(categ?.name);
                };
            })
        }
    }, [categories]);

    const deleteProduct = () => {
        setOpen(false);
        deleteDukaanProductToCloud(product, user, BASE_URL).then(res => {
            analytics.logEvent('product_deleted');
            store.dispatch({
                type: PRODUCT.REMOVE_PRODUCT,
                id: product.id,
            })
        }).catch(err => {
            console.log('Error deleting product on cloud', err);
        })
    }

    const handleActive = (e) => {

        e.stopPropagation();
        e.preventDefault();

        const { _id, isActive } = product;

        let params = {
            _id,
            isActive: !isActive,
        };
    }

    return (
        <>
            <tr onClick={(e) => {
                handleEdit(e, product._id)
                setToggleItem(false)
            }}>

                <td >{(activePage - 1) * 10 + (index + 1)}</td>
                <td className="prdImageBox">
                    <img className="" src={product.image && product.image.length != 0 ? product.image[0] : placeholder} />
                </td>
                <td>
                    <p className="productScreenproductName">
                        {product?.name}
                    </p>
                </td>
                <td>
                    <p className="productScreenproductName">
                        {category}
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
                        show={toggleItem === product._id} onClick={(e) => {
                            e.stopPropagation()
                            setToggleItem(product._id)
                        }}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basics" active={toggleItem === product._id}  >
                            <span>
                                <i className="moreIcon"></i>
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item onClick={(e) => {
                                handleEdit(e, product._id)
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