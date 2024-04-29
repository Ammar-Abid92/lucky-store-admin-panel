import React from 'react';

const Home99 = ({ history }) => {

    return (
        <section className="body_Content_Section">
            <h1>Home</h1>
            <span>Your online store is 99% complete</span>
            <span>Create your first product. Easy and fast</span>
            <span>Create another product</span>
            <input type="submit" value="Add Product" onClick={() => history.push({
                pathname: '/AddProduct',
                origin: 90,
            })} />
            <span>Share on WhatsApp</span>
            <input type="submit" value="Share" onClick={() => { history.push('/Home') }} />
        </section>
    )
}

export default Home99;