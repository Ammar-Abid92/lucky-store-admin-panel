import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../oscar-pos-core/actions';
import Header from '../../common/Header';
import Home90 from '../Home90';
import Home99 from '../Home99';
import './style.css';

const Onboarding = ({ history, location, user }) => {
    return (
        <div>
            <Header />
            {location.progress == 90 ? (
                <Home90 history={history} user={user} />
            ) : (
                <Home90 history={history} user={user} />
                // <Home99 history={history} />
            )}
        </div>
    )
}

export default connect(state => {
    return {
        user: state.user,
    }
})(Onboarding);