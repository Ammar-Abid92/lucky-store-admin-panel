import { getCatalogProductsFromCloud, getCatalogProductsFromCloudBySearch } from '../../../SyncServices';
import { BASE_URL, createTitle, themeStyleSheet } from '../../../constants';
import { addProductFromCatalog } from '../../../oscar-pos-core/actions';
import React, { useState, useEffect } from 'react';
import loader from '../../../assets/03_Loader.gif';
import TopHeader from '../../common/TopHeader';
import AppDialog from '../../common/AppDialog';
import { Spinner } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import './style.css'

const { innerHeight } = window;

const CatalogProducts = ({ products, setCatProduct, backAction, catProduct, setToggle, user, dispatch }) => {

    const { sub_categories } = catProduct;

    const [categoriesProducts, setCategoriesProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addLoad, setAddLoad] = useState(false);
    const [action, setAction] = useState(false);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [exist, setExist] = useState(false);


    useEffect(() => {
        getproducts();
    }, [])

    const getproducts = async () => {

        let Items = [];

        await Promise.all(sub_categories.map(async value => {
            await getCatalogProductsFromCloud(value.id).then(res => {
                Items.push({
                    title: createTitle(res[0].category_name),
                    res,
                })
            })
            return Items
        })).then(() => {
            setCategoriesProducts(Items);
            setLoading(false);
        })
    }


    useEffect(() => {
        let timer;
        if (query) {
            timer = setTimeout(() => {
                handleSearch(query);
            }, 1000);
        } else {
            handleClearSearch();
        }
        return () => clearTimeout(timer)
    }, [query])

    const handleSearch = (product_name) => {

        setLoading(true);
        let Items = [];
        const PARAMS = {
            name: product_name,
            id: catProduct?.id
        }

        getCatalogProductsFromCloudBySearch(PARAMS).then(async (res) => {
            await Promise.all(res.map(async value => {
                Items.push({
                    title: createTitle(value.category_name),
                    res,
                })
                return Items
            })).then(() => {
                setSearchProducts(Items);
                setLoading(false);
            })
        }).catch((e) => {
            setLoading(false);
            console.log("Erorr is search items", e)
        })
    }

    const addProducts = () => {

        setAddLoad(true)
        let params = {
            products: selectedProducts
        }
        addProductFromCatalog(params, user.vanity_url).then((res) => {
            setAction("Item added successfully");
            setTimeout(() => {
                setAddLoad(false)
                setAction(false);
                handleBack(true);
            }, 2000);
        }).catch(err => {
            console.log("err", err)
            setAddLoad(false);
        })
    }

    const handleBack = (isAdded = false) => {

        if (exist) {
            setExist(false);
            setOpen(false);
            return;
        }

        if (open) setOpen(false);
        setToggle(false);
        setTimeout(() => {
            setCatProduct(false);
            if (isAdded) {
                backAction();
            }
        }, 500);
    }

    const handleClearSearch = () => {
        setSearchProducts([]);
        setQuery('');
    }

    const handleCloseDialog = () => {
        setOpen(false);
        setExist(false);
    }

    return action ?
        <div className="successfulCont">
            <img src={loader} alt="Check mark" title="check mark" style={{ resizeMode: 'cover', width: 150, height: 150, }} />
            <p>{action}</p>
        </div>
        :
        <div className='catalogProductsMain'>
            <TopHeader onAction={() => {
                if (selectedProducts.length) setOpen(true);
                else handleBack();
            }}
                title={catProduct?.show_name}
            />

            <div className='customerListInputMain'>
                <div className="form-group searchBartop">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="(Search Items by name)"
                        name='Search'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search"
                        aria-describedby="search-addon"
                    />
                    {query.length ?
                        <span className='textStyling closeBtnStyling pointerCursor' onClick={() => handleClearSearch()}>
                            <svg fill="var(--mediumGray)" height="18" width="18" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                <path fill="" d="M17.555,15.438l9.293-9.293c0.232-0.233,0.36-0.542,0.36-0.871c0-0.329-0.128-0.639-0.36-0.871
                                c-0.466-0.465-1.277-0.465-1.742,0l-9.293,9.292L6.521,4.402c-0.465-0.464-1.277-0.465-1.743,0c-0.233,0.232-0.36,0.542-0.36,0.871
                                c0,0.329,0.127,0.638,0.36,0.871l9.293,9.292L4.777,24.73c-0.48,0.479-0.48,1.262,0,1.742c0.464,0.466,1.276,0.466,1.743,0
                                l9.292-9.293l9.294,9.293c0.465,0.466,1.275,0.465,1.741,0c0.479-0.48,0.479-1.263,0-1.742L17.555,15.438z"/>
                            </svg>
                        </span>
                        :
                        null
                    }
                </div>
            </div>
            {loading ? (
                <div className="StatusCircleCont catalogCategoryCont">
                    <Spinner animation="border" className="loaderCircle" />
                </div>

            ) : (
                <div className='catalogProductsMainInner'>
                    <ProductItem
                        products={searchProducts.length ? searchProducts : categoriesProducts}
                        setSelectedProducts={setSelectedProducts}
                        selectedProducts={selectedProducts}
                        allProducts={products}
                        setExist={setExist}
                        setOpen={setOpen}
                    />

                    <div className="customerSaveBtnMain saveBtnCircle" style={{ height: innerHeight * 0.13, borderColor: themeStyleSheet.extraLightGray }}>
                        <button className="customerSaveBtn" disabled={!selectedProducts.length || addLoad} onClick={addProducts} style={{ backgroundColor: selectedProducts.length ? themeStyleSheet.brightGreen : themeStyleSheet.white, color: selectedProducts.length ? themeStyleSheet.white : themeStyleSheet.lightGray, }} >
                            {addLoad ? <Spinner animation="border" className="loaderCircle" /> : "Save"}
                        </button>
                    </div>
                </div>
            )}

            <AppDialog
                handleClose={handleCloseDialog}
                handleAction={handleBack}
                setOpen={setOpen}
                type={exist ? "exist" : "discard"}
                open={open}
            />
        </div>

}

export default connect(state => {
    return {
        user: state.user,
        products: state.products
    }
})(CatalogProducts);