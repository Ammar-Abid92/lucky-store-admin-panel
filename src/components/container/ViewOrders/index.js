import { getDukaanOrdersFromCloud } from '../../../oscar-pos-core/actions';
import React, { useEffect, useState, useCallback } from 'react';
import DashboardAction from '../../common/DashboardAction';
import { CUSTOMER_BASE_URL } from '../../../constants';
import Pagination from '@mui/material/Pagination';
import { BASE_URL } from '../../../constants';
import { analytics } from '../../../firebase';
import { Dropdown } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import Header from '../../common/Header';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import Cookies from 'js-cookie';
import axios from 'axios';
import './style.css';
import useGetCollectionData from '../../../hooks/getData';

var FILTER = [
  {
    name: 'All',
  },
  {
    name: 'Pending',
  },
  {
    name: 'Accepted',
  },
  {
    name: 'Shipped',
  },
  {
    name: 'Delivered',
  },
  {
    name: 'Declined',
  },
  {
    name: 'Cancelled',
  },
];

const ViewOrders = ({ history, location }) => {

  const allOrders = useGetCollectionData('orders');

  const [selected, setSelected] = useState('ViewOrders');
  const [selectedFilter, setSelFilter] = useState('All');
  const [activePage, setActivePage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(allOrders);

  const changeFilter = (type) => {
    setSelFilter(type);

    if (type !== 'All') {
      let filtered = allOrders.filter((each) => each.order_status == type.toLowerCase());
      setSearch(filtered)
    }
  };

  const handleChange = (event, value) => {
    setActivePage(value);
  };


  const handleSearch = (val) => {
    if (allOrders.length) {
      let res = allOrders.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
      setSearch(res)
    }
  }

  useEffect(() => {
    if (allOrders?.length > 0) setLoading(false);
  }, [allOrders]);

  return (
    <>
      <Header />
      <section className='body_Content_Section dashboardInnerSection'>
        <div className='container-fluid'>
          <div className='row'>
            <DashboardAction type='ViewOrders' history={history} currentSelection={selected} location={location} toggleExpanded={setExpanded} />
            <div className={'col-sm-10'}>
              <div className='RightSectionMain'>
                <div className='viewFirstHeading'>
                  <h1>View Orders</h1>
                </div>
                {loading == true ? (
                  <div className='spinnerContainer'>
                    <Spinner className='loaderCircle ProductsList' animation='border' role='status'></Spinner>
                  </div>
                ) :
                  allOrders.length > 0 ? (
                    <>
                      <div className='viewsTopActionSection'>
                        <div className='row'>
                          <div className='viewsTopSection'>
                            <div className='col-sm-4'>
                              <div className='form-group searchBartop'>
                                <input type='search' className='form-control' placeholder={`${allOrders.length} Orders (Search Orders by ID)`} aria-label='Search' aria-describedby='search-addon' onChange={(e) => handleSearch(e.target.value)} />
                              </div>
                            </div>
                            <div className='selctCategoryMain statusFilter'>
                              <Dropdown>
                                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                  {selectedFilter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  {FILTER.map((value) => {
                                    return (
                                      <Dropdown.Item key={value.name} onSelect={() => changeFilter(value.name)}>
                                        {value.name}
                                      </Dropdown.Item>
                                    );
                                  })}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='newCardBox'>
                        <table className='table table-hover table-fixed table-bordered viewOrderTable' id='LogRecord'>
                          <thead>
                            <tr>
                              <th scope='col'>{'Sr #'}</th>
                              <th scope='col'>Order ID</th>
                              <th scope='col'>Customer Name</th>
                              <th scope='col'>Delivery Address</th>
                              <th scope='col'>Bill Amount</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allOrders.length
                              ? (search.length ? search : allOrders).map((order, index) => {
                                return <ListItem key={order.id} order={order} index={index} activePage={activePage} history={history} allOrders={allOrders} />;
                              })
                              : null}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className='placeHolderContMain'>
                      <p>
                        <i className='orderPlaceholderIcon'></i>
                      </p>
                      <p>No orders found</p>
                      <p className="placeholderParagraph">
                        You have not received any orders yet
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    orders: state.orders,
  };
})(ViewOrders);
