import { addImageForProduct } from '../../../oscar-pos-core/actions';
import { CATEGORY } from '../../../oscar-pos-core/actions/types';
import loader from '../../../assets/03_Loader.gif';
import React, { useEffect, useState } from 'react';
import TopHeader from '../../common/TopHeader';
import AppDialog from '../../common/AppDialog';
import { BASE_URL } from '../../../constants';
import Skeleton from 'react-loading-skeleton';
import { analytics } from '../../../firebase';
import { Spinner } from 'react-bootstrap';
import { store } from '../../../store';
import { connect } from 'react-redux';
import './style.css';
import { addDocToCollection } from '../../../firebase/utils';

const { innerHeight } = window;
const AddCategory = ({ user, setAddCategory, setToggle }) => {
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [catLoad, setCatLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const imgUpload = (e) => {
        setLoading(true);
        getBase64(e.target.files[0])
    }

    const getBase64 = (img, cb) => {

        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function () {
            let params = {
                image_type: 'jpg',
                photo: reader.result,
                phone_number: user.phone_number,
                user_id: user.phone_number,
                activation_code: user.activation_code
            }
            addImageForProduct(params, BASE_URL).then(res => {
                setImage(res.url);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                console.log('err', err);
            })
        }
        reader.onerror = function (error) {
            setLoading(false);
            console.log('see error', error);
        }
    }

    const submitCategory = () => {
        setCatLoad(true);
        let params = {
            name: categoryName,
            description,
            image: 'https://aradbranding.com/en/uploads/topics/mceu_79701281561671280096178.jpg',
        };

        if (!categoryName || !description) {
            setCatLoad(false);
            setErrors({
                category: 'Category name or Description is missing',
            })
            return;
        }
        else {
            addDocToCollection('categories', params).then(() => {
                setSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }).catch((error) => {
                console.log('error', error);
            })
        }
    }


    const backAction = () => {

        if (open) setOpen(false);
        setToggle(false);
        setTimeout(() => {
            setAddCategory(false)
        }, 500);
    }

    return (
        success ?
            <div className="successfulCont">
                <img src={loader} alt="Check mark" title="check mark" style={{ resizeMode: 'cover', width: 150, height: 150, }} />
                <p>{success}</p>
            </div>
            :
            <>
                <TopHeader onAction={() => {
                    if (categoryName) setOpen(true);
                    else backAction();
                }}
                    title={"Add Category"}
                />
                <div className="addItemMainContainer" style={{ height: innerHeight * 0.8 }}>

                    <div className="categoryImage">

                        {
                            loading ? (

                                <div className="categoryImageLoader">
                                    <Skeleton height={105} width={120} />
                                </div>

                            ) : image != '' ? (
                                <div className="editCategoryinner">
                                    <img src={image} />
                                    <button className="categorycloseIconimage" onClick={() => setImage(false)}>x</button>
                                </div>
                            ) : (
                                <div className="uploadFIleCont">
                                    <button className="">
                                        <span>
                                            <i className="uploadImageIcon"></i>
                                        </span>
                                        <span>
                                            Add an image
                                        </span>
                                    </button>
                                    <input type="file" accept='.png, .jpg, .jpeg' name='file' onChange={imgUpload} />
                                </div>
                            )
                        }
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (loading || catLoad || success) {
                            return;
                        } else {
                            submitCategory();
                        }
                    }}>

                        <div className='addItemINputRowCont'>
                            <div className="form-group addItemInupt" style={{ width: 'auto' }}>
                                <input autoFocus={true} className="form-control" placeholder="Enter category name" onChange={(e) => {
                                    if (e.target.value[0] !== ' ') {
                                        setErrors('');
                                        setCategoryName(e.target.value)
                                        return
                                    }

                                }} />
                                <label className="control-label" htmlFor="name">Category Name</label>
                                <span className='inpurErrors'>{errors.category}</span>
                            </div>
                        </div>
                        <button type="submit" style={{ display: 'none' }}></button>

                        <div className="addItemINputRowCont">
                            <div className="form-group textAreaField">
                                <textarea
                                    className="form-control"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>

                </div>
                <div className="buttonContEditDtl" style={{ height: innerHeight * 0.11 }}>
                    <button className={categoryName !== '' && description !== '' ? "login_btn_next" : "login_btn_next addItemDisable"} type="submit" onClick={() => loading ? alert('Your picture is uploading...') : submitCategory()} >
                        {catLoad ?
                            <Spinner className="loaderCircle Products" animation="border" role="status"></Spinner>
                            :
                            "Add Category"
                        }
                    </button>
                </div>

                <AppDialog
                    handleClose={() => setOpen(false)}
                    handleAction={backAction}
                    setOpen={setOpen}
                    type="discard"
                    open={open}
                />

            </>
    )
}

export default connect(state => {
    return {
        user: state.user,
        categories: state.categories.mainCategories
    }
})(AddCategory);