import React from 'react';

const CatalogItem = ({ item, onClick }) => {

    return (
        <div className='categoryBoxinner' onClick={() => onClick(item)}>
            <img src={item.image_url} height={150} width={150} />
            <p>{item.show_name}</p>
        </div>
    )
}

export default CatalogItem;