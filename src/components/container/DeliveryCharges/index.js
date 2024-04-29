import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../constants';
import { modifiedDukaanUserToCloud, updateDukaanUserToCloud, updateUser } from '../../../oscar-pos-core/actions';
import DashboardAction from '../../common/DashboardAction';
import Header from '../../common/Header';

const DeliveryCharges = ({ history, user, dispatch, location }) => {

    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState('DeliveryCharges');
    const [deliveryPerOrder, setDeliveryPerOrder] = useState(user && user.charge_per_order ? user.charge_per_order : 0);
    const [freeDeliveryAbove, setFreeDeliveryAbove] = useState(user && user.free_delivery_above ? user.free_delivery_above : 0);
    const [activeStyle, setActiveStyle] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (value, key) => {
        if (value.length > 0 && !Number(value)) {
            return;
        } else if (key == 'delivery') {
            setDeliveryPerOrder(value);
        } else if (key == 'free') {
            setFreeDeliveryAbove(value);
        }
    }


    const handleSubmit = () => {
        setLoading(true);

        let perOrder = !deliveryPerOrder
            ? 0
            : deliveryPerOrder.toString().replace(' ', '');
        let freeOrder = !freeDeliveryAbove
            ? 0
            : freeDeliveryAbove.toString().replace(' ', '');

        if ((!perOrder || parseFloat(perOrder) == 0) && freeOrder) {
            setLoading(false)
            setErrors({
                name: 'Delivery charges amount should be set'
            })
            return;
        }

        let params = {
            charge_per_order: parseFloat(perOrder),
            free_delivery_above: parseFloat(freeOrder),
            phone_number: user.phone_number,
        }


        updateDukaanUserToCloud(params, BASE_URL)
            .then(upd_res => {
                dispatch(updateUser(params)).then(res => {
                    // Firebase.logEvent('delivery_charges_changed', {
                    //     charge_per_order: parseFloat(perOrder),
                    //     free_delivery_above: parseFloat(freeOrder)
                    // })
                    setLoading(false);
                }).catch(err => {
                    console.log('err', err);
                    setLoading(false);
                })
            })
            .catch(err => {
                console.log('modifiedDukaanUserToCloud Error:', err);
                setLoading(false);
            });
    }

    return (
        <>
            <Header />
            <section className="body_Content_Section dashboardInnerSection">
                <div className="container-fluid">
                    <div className="row">
                        <DashboardAction type={'DeliveryCharges'} history={history} location={location} toggleExpanded={setExpanded} currentSelection={selected} />
                        <div className={expanded ? "col-sm-9 marginLeftClosed" : "col-sm-10 marginLeft"}>
                            <h1>Delivery Charges</h1>
                            <p>Delivery charge for per order</p>
                            <input
                                value={deliveryPerOrder}
                                onChange={(e) => handleChange(e.target.value, 'delivery')}

                            />
                            <p>Free delivery above</p>
                            <input
                                value={freeDeliveryAbove}
                                onChange={(e) => handleChange(e.target.value, 'free')}
                            />
                            <br />
                            <button
                                onClick={() => handleSubmit()}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default connect(state => {
    return {
        user: state.user,
    }
})(DeliveryCharges);