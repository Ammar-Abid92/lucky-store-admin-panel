import { addDukaanCategoryToCloud, addImageForProduct, getDukaanCategoryFromCloud } from '../../../oscar-pos-core/actions';
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

const { innerHeight } = window;
const AddCategory = ({ user, categories, setAddCategory, setToggle, fromProduct, setCategory }) => {

    const [categoryName, setCategoryName] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [catLoad, setCatLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');




    const getCategories = () => {
        getDukaanCategoryFromCloud(user.vanity_url, BASE_URL, {

        })
    }

    useEffect(() => {
        getCategories();
    }, [])

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
            phone_number: user.phone_number,
            photo: image,
        };
        if (!categoryName) {
            setCatLoad(false);
            setErrors({
                category: 'Category name is required',
            })
            return;
        }
        let myArr = categories.filter((x) => (x.name).toLowerCase() == (params.name).toLowerCase());
        if (myArr.length > 0) {
            setErrors({
                category: 'Category name already exists',
            })
            setCatLoad(false);
            return;
        } else {
            addDukaanCategoryToCloud(params, user.vanity_url, BASE_URL)
                .then(res => {
                    analytics.logEvent('add_category');
                    params._id = res.data.id.toString();
                    store.dispatch({
                        type: CATEGORY.ADD_CATEGORY,
                        data: params,
                    });
                    fromProduct && setCategory(params)
                    setCatLoad(false);
                    setSuccess("CATEGORY ADDED SUCCESSFULLY");
                    setTimeout(() => {
                        setSuccess(false);
                        backAction();
                    }, 2000);
                    // Firebase.logEvent('add_category', { ...params, id: res.data.id });
                })
                .catch(err => {
                    console.log('Error pushing Category to cloud', err);
                    setCatLoad(false);
                });
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

                                // <div className="categoryImage">
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

                                // </div>
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
                            <div className="form-group addItemInupt">
                                <input autoFocus={true} className="form-control" placeholder="Enter category name" onChange={(e) => {
                                    if (e.target.value[0] !== ' ') {
                                        console.log(e.target.value)
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
                    </form>

                </div>
                <div className="buttonContEditDtl" style={{ height: innerHeight * 0.11 }}>
                    <button className={categoryName ? "login_btn_next" : "login_btn_next addItemDisable"} type="submit" disabled={catLoad || loading || success} onClick={() => loading ? alert('Your picture is uploading...') : submitCategory()} >
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