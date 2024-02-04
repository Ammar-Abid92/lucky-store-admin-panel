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

const ViewOrders = ({ user, orders, history, location }) => {
  const [selected, setSelected] = useState('ViewOrders');
  const [selectedFilter, setSelFilter] = useState('All');
  const [activePage, setActivePage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // const getOrders = useCallback(() => {
  //   if (search === '') {
  //     Promise.all([
  //       getDukaanOrdersFromCloud(BASE_URL, {
  //         page_number: activePage,
  //       }),
  //     ])
  //       .then((res) => {
  //         console.log(res, 'orders');
  //         SortDefaultOrders(res[0].results).then((ord) => {
  //           console.log(ord);
  //           setNumOfPages(Math.ceil(res[0].total / 10));
  //           setTotalItems(res[0].total);
  //           setAllOrders(ord);
  //         });
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log('err getting orders from cloud', err);
  //         setLoading(false);
  //       });
  //   } else {
  //     let url = `${BASE_URL}api/toko/v3/orders?name=${search}&page_size=10&page_number=${activePage}`;

  //     console.log('Url', url);

  //     axios
  //       .get(url, {
  //         headers: {
  //           'Authorization': 'JWT ' + Cookies.get('token'),
  //           'Content-Type': 'application/json'
  //         }
  //       }).then((res) => {
  //         console.log(res.data.data)
  //         setAllOrders(res.data.data.results)
  //         setNumOfPages(Math.ceil(res.data.data.total / 10))
  //       }).catch((e) => console.log(e))

  //   }
  // }, [activePage, search]);

  // useEffect(() => {
  //   getOrders();
  // }, [getOrders]);

  // const SortDefaultOrders = (data) => {
  //   let pendingOrders,
  //     acceptedOrders,
  //     outForDeliveryOrders,
  //     deliveredOrders,
  //     decline,
  //     allOrders = '';
  //   data.sort((a, b) => {
  //     var dateA = new Date(a.created),
  //       dateB = new Date(b.created);
  //     return dateB - dateA;
  //   });

  //   return new Promise((res, rej) => {
  //     pendingOrders = data.filter((item) => item.status === 'pending');
  //     acceptedOrders = data.filter((item) => item.status === 'accepted');
  //     outForDeliveryOrders = data.filter((item) => item.status === 'shipped');
  //     deliveredOrders = data.filter((item) => item.status === 'delivered');
  //     decline = data.filter((item) => item.status === 'declined');
  //     allOrders = pendingOrders.concat(acceptedOrders).concat(outForDeliveryOrders).concat(deliveredOrders).concat(decline);
  //     res(allOrders);
  //   });
  // };

  const clearSearch = () => {
    if (selectedFilter === 'All') {
      // setAllOrders(orders);
    }
    setSearch('');
  };

  const handleSearch = (text) => {
    analytics.logEvent('order_search');
    setActivePage(1);
    setSearch(text);
  };

  const changeFilter = (type) => {
    setSelFilter(type);

    if (type !== 'All') {
      let searchOrder = orders.filter((item) => item.status.includes(type.toLocaleLowerCase()));
      // setAllOrders(searchOrder);
    } else {
      // setAllOrders(orders);
    }
  };

  // const handleLoadMore = (isMore) => {
  //   if (isMore) {
  //     SortDefaultOrders(orders).then((res) => setAllOrders(res));
  //   } else {
  //     SortDefaultOrders(orders).then((res) => setAllOrders(res.slice(0, 5)));
  //   }
  // };

  const handleChange = (event, value) => {
    setActivePage(value);
  };

  const allOrders = useGetCollectionData('orders');

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
                                <input type='search' value={search} className='form-control' placeholder={`${totalItems} Orders (Search Orders by ID)`} aria-label='Search' aria-describedby='search-addon' onChange={(e) => handleSearch(e.target.value)} />
                                {search.length ? (
                                  <span className='textStyling closeBtnStyling pointerCursor' onClick={clearSearch}>
                                    <svg fill='var(--mediumGray)' height='18' width='18' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'>
                                      <path
                                        fill=''
                                        d='M17.555,15.438l9.293-9.293c0.232-0.233,0.36-0.542,0.36-0.871c0-0.329-0.128-0.639-0.36-0.871
                                                                    c-0.466-0.465-1.277-0.465-1.742,0l-9.293,9.292L6.521,4.402c-0.465-0.464-1.277-0.465-1.743,0c-0.233,0.232-0.36,0.542-0.36,0.871
                                                                    c0,0.329,0.127,0.638,0.36,0.871l9.293,9.292L4.777,24.73c-0.48,0.479-0.48,1.262,0,1.742c0.464,0.466,1.276,0.466,1.743,0
                                                                    l9.292-9.293l9.294,9.293c0.465,0.466,1.275,0.465,1.741,0c0.479-0.48,0.479-1.263,0-1.742L17.555,15.438z'
                                      />
                                    </svg>
                                  </span>
                                ) : null}
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
                              ? allOrders.map((order, index) => {
                                return <ListItem key={order.id} order={order} index={index} activePage={activePage} history={history} allOrders={allOrders} />;
                              })
                              : null}
                          </tbody>
                        </table>
                        <div className='paginationContainer'>{numOfPages > 1 && <Pagination count={numOfPages} shape='rounded' onChange={handleChange} color='secondary' />}</div>
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
