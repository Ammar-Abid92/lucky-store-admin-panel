import { getCatalogsFromCloud } from '../../../SyncServices';
import DashboardAction from '../../common/DashboardAction';
import React, { useState, useEffect } from 'react';
import TopHeader from '../../common/TopHeader';
import Slider from '../../common/Slider';
import { Spinner } from 'react-bootstrap';
import Header from '../../common/Header';
import CatalogItem from './CatalogItem';
import { connect } from 'react-redux';
import './style.css';

const { innerHeight } = window;
const CatalogScreen = ({ setCatalog, setToggle }) => {

    const [selected, setSelected] = useState('AllProducts');
    const [catProduct, setCatProduct] = useState(false);
    const [togglePr, setTogglePr] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getCatalogs();
    }, [])

    const getCatalogs = () => {
        getCatalogsFromCloud().then(res => {
            setCatalogs(res.categories);
            setLoading(false);
        }).catch(err => {
            console.log('ERR', err);
            setLoading(false);

        })
    }

    const onSelectCategory = (category) => {
        setCatProduct(category);
        setTimeout(() => {
            setTogglePr(true);
        });
    }

    const backAction = () => {
        setToggle(false);
        setTimeout(() => {
            setCatalog(false);
        }, 500);
    }

    return (
        <>
            <TopHeader onAction={backAction} title={"Choose Category"} />
            <div className="RightSectionMain">
                {loading == true ? (
                    <div className='spinnerContainer'>
                        <Spinner className="loaderCircle ProductsList" animation="border" role="status"></Spinner>
                    </div>
                ) :
                    <div className='categoryBoxMain' style={{ height: innerHeight * 0.8 }}>
                        {catalogs.map((val, index) => {
                            return (
                                <CatalogItem
                                    key={index}
                                    item={val}
                                    key={val.id}
                                    onClick={onSelectCategory}
                                />
                            )
                        })}
                    </div>
                }
            </div>
            {/* <section className="body_Content_Section dashboardInnerSection">
                <div className="container-fluid">
                    <div className="row">
                        
                    </div>
                </div>
            </section> */}

            {catProduct &&
                <Slider
                    setCatProduct={setCatProduct}
                    setToggle={setTogglePr}
                    catProduct={catProduct}
                    backAction={backAction}
                    toggle={togglePr}
                />}
        </>
    )
}

export default connect(state => {
    return {
        user: state.user
    }
})(CatalogScreen);