import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { logout } from '../../../oscar-pos-core/actions';
import { analytics } from '../../../firebase';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import AppDialog from '../AppDialog';
import './style.css';

const DashboardAction = ({ history, toggleExpanded, currentSelection }) => {
    const [selected, setSelected] = useState('home');
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false)

    const handleLogout = () => {

        setOpen(false);
        logout().then(res => {
            analytics.logEvent('logout_pressed');
            history.push('/');
        })
    }

    return (
        <>

            <div className={"col-sm-1"}>
                <div className="leftSectionNav">
                    <SideNav
                        onSelect={(sel) => {
                            setSelected(sel)
                        }}
                        onToggle={(ex) => {
                            setExpanded(ex)
                            toggleExpanded(ex)
                        }}
                        expanded={expanded}

                    >
                        <SideNav.Toggle />
                        <SideNav.Nav >
                            <NavItem title="Home" className={currentSelection == 'home' ? "active" : null} onClick={() => history.push('/Home')} eventKey="home">
                                <NavIcon>
                                    <span>
                                        <i className="navHomeIcon"></i>
                                    </span>
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>

                            <NavItem title="Orders" className={currentSelection == 'ViewOrders' ? "active" : null} onClick={() => history.push('/ViewOrders')} eventKey="ViewOrders">
                                <NavIcon>
                                    <span>
                                        <i className="navOrderIcon"></i>
                                    </span>
                                </NavIcon>
                                <NavText>
                                    Orders
                                </NavText>
                            </NavItem>


                            <NavItem title="Items" className={currentSelection == 'AllProducts' ? "active" : null} onClick={() => history.push('/AllItems')} eventKey="AllProducts">
                                <NavIcon>
                                    <span>
                                        <i className="navProductIcon"></i>
                                    </span>
                                </NavIcon>
                                <NavText>
                                    Items
                                </NavText>
                            </NavItem>


                            <NavItem title="Categories" className={currentSelection == 'AllCategories' ? "active" : null} onClick={() => history.push('/AllCategories')} eventKey="AllCategories">
                                <NavIcon>
                                    <span>
                                        <i className="navCategoryIcon"></i>
                                    </span>
                                </NavIcon>
                                <NavText>
                                    Categories
                                </NavText>
                            </NavItem>

                            <NavItem title="Logout" onClick={() => {
                                localStorage.removeItem('userConfirmation');
                                window.location.reload();
                            }} eventKey="Logout">
                                <NavIcon>
                                    <span>
                                        <i className="navLogoutIcon"></i>
                                    </span>
                                </NavIcon>
                                <NavText>
                                    Logout
                                </NavText>
                            </NavItem>


                        </SideNav.Nav>
                    </SideNav>
                </div>
            </div>

            <AppDialog
                handleClose={() => setOpen(false)}
                handleAction={handleLogout}
                setOpen={setOpen}
                type=""
                open={open}
            />
        </>
    )
}

export default connect(state => {
    return {
        user: state.user,
    }
})(DashboardAction);