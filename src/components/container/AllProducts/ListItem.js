import { deleteDukaanProductToCloud, updateDukaanProductStatusToCloud } from '../../../oscar-pos-core/actions';
import { BASE_URL, CUSTOMER_BASE_URL } from '../../../constants';
import placeholder from '../../../assets/icons/placeholder.png';
import { PRODUCT } from '../../../oscar-pos-core/actions/types';
import { formatNum } from '../../../oscar-pos-core/constants';
import AppDialog from '../../common/AppDialog';
import { analytics } from '../../../firebase';
import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import { store } from '../../../store';
import './style.css';

const ListItem = ({ product, user, handleEdit, index, activePage, toggleItem, setToggleItem, search }) => {

    const [open, setOpen] = useState(false);

    const deleteProduct = () => {
        setOpen(false);
        deleteDukaanProductToCloud(product, user, BASE_URL).then(res => {
            analytics.logEvent('product_deleted');
            store.dispatch({
                type: PRODUCT.REMOVE_PRODUCT,
                id: product._id,
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

        updateDukaanProductStatusToCloud(product, params, user, BASE_URL)
            .then(res => {
                analytics.logEvent('toggle_product_status');
                store.dispatch({
                    type: PRODUCT.UPDATE_PRODUCT_STATUS,
                    data: { ...product, id: product._id },
                });
            })
            .catch(err => {
                console.log('Error Response Product Status Change', err);
            });
    }

    const shareProduct = (e) => {
        setToggleItem(false)
        e.stopPropagation();
        if (navigator.canShare) {
            navigator.share({
                title: 'MY PRODUCT!',
                text: 'Check out my product listed at Toko.pk !',
                url: user.vanity_url + '.' + CUSTOMER_BASE_URL + '/products/' + (product.slug ? product.slug : product._id)
            })
                .then(() => {
                    analytics.logEvent('share_product');
                })
                .catch((error) => console.log('Sharing failed', error));
        } else {
            console.log(`Your system doesn't support sharing files.`);
        }
    }

    return (
        <>
            <tr onClick={(e) => {
                handleEdit(e, product._id)
                setToggleItem(false)
            }}>

                <td >{(activePage - 1) * 10 + (index + 1)}</td>
                <td className="prdImageBox">
                    <img className="" src={product.photo && product.photo.length != 0 ? product.photo[0] : placeholder} />
                </td>
                <td>
                    <p className="productScreenproductName">
                        {product?.name}
                    </p>
                </td>
                <td>
                    {product.categories[0] ? product.categories[0].name : ''}
                </td>
                <td>
                    {product.stock <= 5 ?
                        <p className="productScreenLowStock">
                            Low stock item
                        </p>
                        :
                        <p className="productScreenproductName">
                            {product.stock}
                        </p>
                    }
                </td>
                <td>
                    {product.perUnit}
                    {product.discountPrice ?
                        <span className='productListingDiscount'>
                            Disc : %
                        </span>
                        :
                        null}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                    <div className="productActivestate" >
                        <label className="switch">
                            <input type="checkbox" checked={product.isActive}
                                onChange={(e) => handleActive(e)}
                            />
                            <span className="slider round"></span>
                        </label>

                    </div>
                </td>
                <td>
                    {user ? user.currency ? user.currency : 'Rs. ' : 'Rs. '}  {formatNum(product.discountPrice ? product.discountPrice : product.price)}
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
                            <Dropdown.Item onClick={(e) => shareProduct(e)}>
                                <span>
                                    <i className="shareIcon"></i>
                                </span>
                                <span>
                                    Share
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