import React from 'react';
import { Spinner } from 'react-bootstrap';


const Loader = ({ load }) => {

    return (
        load ?
            <div className={"fullScreenLoader"}>
                <Spinner animation="border" className="loaderCircle fullScreenCircle" />
            </div>
            : null
    )
}

export default Loader