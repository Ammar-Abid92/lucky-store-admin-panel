import React, { useMemo } from 'react';
import { themeStyleSheet } from '../../../constants';
import './style.css'


const { innerHeight } = window;

const ProductItem = ({
    setSelectedProducts,
    selectedProducts,
    allProducts,
    products,
    setExist,
    setOpen
}) => {

    const handleSelection = (item) => {

		let findExist = allProducts.find((x => x.catalog_id === item))

		if (findExist) {
            setExist(true);
            setOpen(true);
			return
		} else {
            if(selectedProducts.length) {
                let product_exists = selectedProducts.filter(x => x === item);

                if(product_exists.length) {
                    setSelectedProducts(prev => prev.filter(x => x !== item));
                } else {
                    setSelectedProducts(prev => [...prev, item]);
                }
            } else {
                setSelectedProducts([item]);
            }
        }
    }
    const renderHeader = (title) => {
        return (
            <div className="catalogHeaderText">
                <span>
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                </span>

            </div>
        )
    }
    const renderItem = (value, index, title) => {

        const selected = selectedProducts.length && selectedProducts.some(x => x === value.id)
        return (
            <div className="stockList catalogListItem" onClick={() => handleSelection(value.id)} key={index} >
                <div className="stockEditButton">
                    <img src={value.image_url} alt={`${value.name}`} />
                </div>

                <div className="stockItemDetail">
                    <div className="stockItemName">
                        <p>
                            {value.name}
                        </p>
                    </div>
                </div>

                <div className="tickMarkBox">
                    <div className="stock_managmentCheckbox" style={{ backgroundColor: selected ? themeStyleSheet.brightGreen : themeStyleSheet.white, }}>
                        {selected ?
                            <span>
                                <svg fill="#fff" height="20" width="20" viewBox="0 0 45 60" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="" d="M43.081,11.959c-1.087-0.357-2.046-0.075-2.999,0.887L20.154,32.799l-4.233-4.238
                                c-1.614-1.604-3.229-3.216-4.833-4.833c-0.582-0.579-1.216-0.874-1.882-0.874c-0.179,0-0.364,0.021-0.549,0.063
                                c-1.13,0.26-1.903,0.979-2.233,2.081c-0.302,0.994-0.013,1.913,0.882,2.813l10.829,10.815c1.194,1.199,2.916,1.215,4.162-0.017
                                l11.717-11.781c3.395-3.415,6.791-6.832,10.191-10.238c0.718-0.719,0.993-1.623,0.773-2.546
                                C44.75,13.083,44.005,12.265,43.081,11.959z"/>
                                </svg>
                            </span>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="categoryBoxProductMain" style={{ height: innerHeight * 0.68 }} >
            {products.length &&
                products.map((item, index) => {
                return (
                    <div className='productMap' key={index} >
                        {renderHeader(item.title)}
                        {item.res.map((value, index) =>
                            renderItem(value, index, item.title)
                        )}
                    </div>
                )
            })}

            {/* {responseLoad.current ?
                <div className="itemListLoader">
                    <Spinner animation="border" className="loaderCircle" />
                </div>
                : 
                null
            } */}

        </div>
    )

}

export default ProductItem;