import { addImageForProduct, updateDukaanCategoryToCloud } from '../../../oscar-pos-core/actions';
import React, { useState, useEffect } from 'react';
import loader from '../../../assets/03_Loader.gif';
import AppDialog from '../../common/AppDialog';
import TopHeader from '../../common/TopHeader';
import { BASE_URL } from '../../../constants';
import Skeleton from 'react-loading-skeleton';
import { analytics } from '../../../firebase';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import './style.css';

const { innerHeight } = window;
const EditCategory = ({ setToggle, setEditCategory, categoryId, user, allCategories }) => {

    const [selectedCategory, setSelectedCategory] = useState({});
    const [imageLoading, setImageLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [oldName, setOldName] = useState('');
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');


    useEffect(() => {

        let myArr = allCategories.filter((x) => x._id == categoryId);
        setValueToInput(myArr[0])
        setSelectedCategory(myArr[0]);
        setImage(myArr[0].photo)
    }, [])

    const setValueToInput = (category) => {
        setCategoryName(category.name)
        setOldName(category.name)
    }

    const imgUpload = (e) => {
        getBase64(e.target.files[0])
    }

    const getBase64 = (img, cb) => {

        setImageLoading(true);

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
                setImageLoading(false)
            }).catch(err => {
                console.log('err', err);
            })
        }
        reader.onerror = function (error) {
            setImageLoading(false);
            console.log('see error', error);
        }
    }

    const submitCategory = (e) => {
        e.preventDefault()
        setLoading(true);
        let myArr = allCategories.filter((x) => (x.name).toLowerCase() == (categoryName).toLowerCase());

        if (categoryName != oldName && myArr.length > 0) {
            setErrors({
                category: 'Category name already exists'
            })
            setLoading(false);
            return;
        }
        if (!categoryName) {
            setErrors({
                category: 'Category name is required',
            });
            setLoading(false);
            return;
        } else {
            setErrors({});
            let params = {
                _id: selectedCategory._id,
                name: categoryName,
                phone_number: user.phone_number,
                activation_code: user.activation_code,
                photo: image,
            };
            updateCategory(params);
        }
    }

    const updateCategory = (params) => {

        updateDukaanCategoryToCloud(params, user, BASE_URL)
            .then(res => {
                let eventObject = params;
                delete eventObject._id

                analytics.logEvent('category_updated');
                setLoading(false);
                setSuccess("CATEGORY UPDATED SUCCESSFULLY");
                setTimeout(() => {
                    setSuccess(false);
                    handleBack();
                }, 2000);
            })
            .catch(err => {
                console.log('Error pushing Category to cloud', err);
                setLoading(false);
            });
    }

    const handleBack = () => {

        if (open) setOpen(false);
        setToggle(false);
        setTimeout(() => {
            setEditCategory(false);
        }, 500);
    }

    const handleChange = () => {

        if (
            selectedCategory.name !== categoryName ||
            selectedCategory.photo !== image
        ) {
            return true;
        } else return false
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
                    if (handleChange()) setOpen(true);
                    else handleBack();
                }}
                    title={"Edit Category"}
                />

                <div className="addItemMainContainer" style={{ height: innerHeight * 0.8 }}>

                    <div className="categoryImage">
                        {
                            imageLoading ? (
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
                                            Add image
                                        </span>
                                    </button>
                                    <input type="file" accept='.png, .jpg, .jpeg' name='file' onChange={imgUpload} />
                                </div>
                            )
                        }
                    </div>
                    <form onSubmit={submitCategory} id='editCategoryForm'>
                        <div className='addItemINputRowCont'>
                            <div className="form-group addItemInupt">
                                <input className="form-control" placeholder="Enter category name" onChange={(e) => {

                                    if (e.target.value[0] !== ' ') {
                                        console.log(e.target.value)
                                        setErrors('');
                                        setCategoryName(e.target.value)
                                        return
                                    }
                                }} value={categoryName} />
                                <label className="control-label" htmlFor="name">Category Name</label>
                                <span className='inpurErrors'>{errors.category}</span>
                            </div>
                        </div>
                        {/* <button type="submit" style={{ display: 'none' }}></button> */}
                    </form>
                </div>

                <div className="buttonContEditDtl" style={{ height: innerHeight * 0.11 }}>
                    <button className="login_btn_next" type="submit" form='editCategoryForm' disabled={loading || !categoryName || categoryName === selectedCategory.name}>
                        {loading ?
                            <Spinner className="loaderCircle Products" animation="border" role="status"></Spinner>
                            :
                            "Update"}
                    </button>
                </div>


                <AppDialog
                    handleClose={() => setOpen(false)}
                    handleAction={handleBack}
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
        products: state.products,
    }
})(EditCategory);