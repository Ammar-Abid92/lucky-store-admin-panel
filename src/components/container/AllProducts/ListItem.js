import placeholder from '../../../assets/icons/placeholder.png';
import AppDialog from '../../common/AppDialog';
import firebase from '../../../firebase';
import { Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './style.css';

const ListItem = ({ product, handleEdit, index, activePage, toggleItem, setToggleItem }) => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    const db = firebase.firestore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const returnedPromise = db.collection('categories').get();
                const [snapshot] = await Promise.all([returnedPromise]);
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                if (isMounted) setCategories(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        if (categories?.length > 0) {
            categories?.forEach((categ) => {
                if (categ?.id === product?.category_id) {
                    setCategory(categ?.name);
                };
            })
        }

        return () => {
            setIsMounted(false);
        }
    }, [categories]);

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