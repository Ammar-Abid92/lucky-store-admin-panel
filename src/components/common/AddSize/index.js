import { themeStyleSheet } from '../../../constants';
import React, { useState } from 'react';

const AddSize = ({ setSelectedSizes, selectedSizes, setIsChanged }) => {

    const [size, setSize] = useState('')
    const [error, setError] = useState('');

    const onChange = (text) => {
        setError('');
        setSize(text);
    }

    const addSize = () => {

        let arr = selectedSizes;

        if (arr) {
            let myArray = arr.filter(x => (x.name).toLowerCase() == (size).toLowerCase());
            if (myArray.length > 0) {
                setError("You have already entered this size")
            } else if (size == '') {
                setError("Please enter a size")
            } else {
                setIsChanged(true)
                setSelectedSizes([...arr, { name: size }]);
                setSize('')
            }
        } else {
            if (size == '') {
                setError("Please enter a size")
            } else {
                setIsChanged(true)
                setSelectedSizes([...arr, { name: size }]);
                setSize('')
            }
        }
    }

    const deleteSize = (name) => {
        setSelectedSizes([...selectedSizes.filter((e) => e.name != name)]);
        setIsChanged(true)
    }

    return (
        <>
            <form >
                <div className='addItemINputRowCont addSizeVariant'>
                    <div className="form-group addItemInupt">
                        <input className="form-control" value={size} placeholder="Enter Item Name" onChange={(e) => onChange(e.target.value)} />
                        <label className="control-label" htmlFor="name">Enter size</label>
                        <span className='inpurErrors'>{error}</span>
                    </div>
                    <span className='variantPlusIcon' style={{
                        backgroundColor: size ? themeStyleSheet.mainColor : themeStyleSheet.white,
                        border: `1px solid ${size ? themeStyleSheet.mainColor : themeStyleSheet.lightGray}`,
                    }}
                        onClick={addSize}
                    >
                        <svg fill={size ? themeStyleSheet.white : themeStyleSheet.lightGray} height="20" width="20" viewBox="-1 0 33 33" xmlns="http://www.w3.org/2000/svg">
                            <path fill={size ? themeStyleSheet.white : themeStyleSheet.lightGray} d="M26.296,15.401c-0.006-0.072-0.01-0.148-0.021-0.219c-0.021-0.093-0.049-0.181-0.081-0.267l-0.006-0.022
                        c-0.236-0.582-0.799-0.984-1.477-0.984h-7.617l0.002-7.617c0-0.787-0.541-1.421-1.277-1.563
                        c-0.075-0.015-0.152-0.02-0.229-0.025c-0.029,0-0.059-0.008-0.089-0.008c-0.033,0-0.064,0.008-0.096,0.01
                        c-0.075,0.002-0.149,0.007-0.221,0.022c-0.094,0.014-0.182,0.045-0.27,0.078l-0.021,0.008c-0.582,0.234-0.984,0.797-0.984,1.477
                        v7.615H6.291c-0.786,0-1.42,0.54-1.563,1.275c-0.016,0.076-0.018,0.149-0.022,0.227c-0.002,0.031-0.01,0.058-0.01,0.091
                        c0,0.036,0.01,0.068,0.011,0.103c0.004,0.071,0.007,0.144,0.021,0.215c0.018,0.09,0.045,0.179,0.077,0.262l0.004,0.021
                        c0.24,0.589,0.803,0.993,1.481,0.993h7.616v7.616c0,0.785,0.54,1.42,1.276,1.563c0.073,0.015,0.149,0.019,0.226,0.023
                        c0.03,0,0.06,0.007,0.091,0.007c0.036,0,0.068-0.007,0.103-0.01c0.074-0.002,0.145-0.008,0.216-0.021
                        c0.091-0.018,0.179-0.046,0.263-0.08c0,0,0.019-0.005,0.027-0.005c0.583-0.235,0.985-0.8,0.985-1.479v-7.616h7.617
                        c0.785,0,1.419-0.54,1.563-1.276c0.012-0.076,0.019-0.152,0.022-0.23c0.002-0.028,0.008-0.058,0.008-0.088
                        C26.305,15.464,26.297,15.434,26.296,15.401z"/>
                        </svg>
                    </span>
                </div>
            </form>
            
            <div className='sizesList'>
            {selectedSizes.length ?
                selectedSizes.map((item, index) => {
                    return (
                        <div className='sizesListInner' key={index}>
                            <span>{item.name}</span>
                            <span onClick={() => deleteSize(item.name)}>
                                <svg fill='var(--red)' height="18" width="18" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="" d="M14.977,18.341V8.129c0-0.375-0.305-0.679-0.68-0.679s-0.679,0.303-0.679,0.679v10.211
                                        c0,0.376,0.304,0.68,0.679,0.68S14.977,18.717,14.977,18.341z M11.263,18.341V8.129c0-0.375-0.304-0.679-0.679-0.679
                                        c-0.376,0-0.68,0.303-0.68,0.679v10.211c0,0.376,0.304,0.68,0.68,0.68C10.959,19.021,11.263,18.717,11.263,18.341z M18.762,7.451
                                        c-0.376,0-0.679,0.303-0.679,0.679v12.334c0,0.405-0.331,0.735-0.735,0.735H7.535c-0.406,0-0.736-0.33-0.736-0.735V8.129
                                        c0-0.375-0.304-0.679-0.679-0.679c-0.374,0-0.68,0.303-0.68,0.679v12.334c0,1.154,0.938,2.094,2.095,2.094h9.813
                                        c1.153,0,2.093-0.939,2.093-2.094V8.129C19.44,7.754,19.135,7.451,18.762,7.451z M20.57,4.912h-3.824V2.803
                                        c0-0.376-0.306-0.679-0.68-0.679H8.814c-0.374,0-0.679,0.302-0.679,0.679v2.109H4.311c-0.374,0-0.679,0.302-0.679,0.679
                                        c0,0.374,0.305,0.679,0.679,0.679h16.26c0.374,0,0.679-0.305,0.679-0.679C21.249,5.214,20.944,4.912,20.57,4.912z M15.388,4.912
                                        H9.494V3.483h5.894V4.912L15.388,4.912z"/>
                                </svg>
                            </span>
                        </div>
                    )
                })
                : null}
            </div>
        </>
    )
}

export default AddSize;