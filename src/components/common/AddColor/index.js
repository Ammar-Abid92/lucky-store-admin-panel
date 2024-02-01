import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './style.css';

const AddColor = ({ setSelectedColors, selectedColors, isChanged, setIsChanged }) => {

    const [error, setError] = useState({});
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [allColors, setAllColors] = useState([
        {
            name: '#F44236',
            selected: false,
        },
        {
            name: '#EA1E63',
            selected: false,
        },
        {
            name: '#FF0000',
            selected: false,
        },
        {
            name: '#9C28B1',
            selected: false,
        },
        {
            name: '#673BB7',
            selected: false,
        },
        {
            name: '#2196F3',
            selected: false,
        },
        {
            name: '#03A9F5',
            selected: false,
        },
        {
            name: '#00BCD5',
            selected: false,
        },
        {
            name: '#009788',
            selected: false,
        },
        {
            name: '#4CB050',
            selected: false,
        },
        {
            name: '#8BC24A',
            selected: false,
        },
        {
            name: '#CDDC39',
            selected: false,
        },
        {
            name: '#FFEB3C',
            selected: false,
        },
        {
            name: '#FEC107',
            selected: false,
        },
        {
            name: '#FF9700',
            selected: false,
        },
        {
            name: '#FE5722',
            selected: false,
        },
        {
            name: '#795547',
            selected: false,
        },
        {
            name: '#9E9E9E',
            selected: false,
        },
        {
            name: '#607D8B',
            selected: false,
        },
        {
            name: '#000000',
            selected: false,
        },
        {
            name: '#FFFFFF',
            selected: false,
        },
        {
            name: '#D1D3D4',
            selected: false,
        },
        {
            name: '#939598',
            selected: false,
        },
        {
            name: '#6D6E71',
            selected: false,
        },
        {
            name: '#414042',
            selected: false,
        },
    ])

    useEffect(() => {

        if (selectedColors.length > 0) {
            var myArray = allColors;
            selectedColors.forEach(element => {
                myArray.find(x => x.name == element.name).selected = true
            });
            setAllColors([...myArray]);
        } else {
            // setShowColorPicker(true);
        }
    }, [])

    const updateColors = (hexClicked, status) => {
        var myArray = allColors;
        myArray.find(x => x.name == hexClicked).selected = !status
        let selectedArray = myArray.filter(x => x.selected == true);
        setIsChanged(true);
        setSelectedColors([...selectedArray]);
    }

    const submitColors = () => {
        setIsChanged(true);
        let newArray = allColors;
        let myArray = newArray.filter(x => x.selected == true);
        setSelectedColors(myArray);
        setShowColorPicker(false);
    }

    const clearSelcetion = () => {
        setShowColorPicker(false);
        setIsChanged(true);
        let myArray = allColors;
        myArray.forEach(y => y.selected = false);
        setAllColors([...myArray]);
        setSelectedColors([])
    }

    return (
        <>

            <div className='addItemINputRowCont addSizeVariant'>
                <div className="form-group addItemInupt" onClick={() => setShowColorPicker(true)}>
                    <input className="form-control" placeholder="Select Color" />
                    <label className="control-label" htmlFor="name">Select Color</label>
                    {/* <span style={{ color: themeStyleSheet.red }}>{error}</span> */}
                </div>

            </div>

            <div className='sizesList'>
                {allColors.filter(x => x.selected == true).map((item, index) => {
                    return (
                        <div className='sizesListInner' key={index}>
                            <span>
                                <i className='sizesListInnercolorBox' style={{ backgroundColor: item.name }}></i>
                                {item.name}
                            </span>
                            <span onClick={() => updateColors(item.name, true)}>
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
                })}
            </div>


            <Modal
                className="modalMainConts addColorModal"
                show={showColorPicker}
                onHide={() => setShowColorPicker(false)}
                keyboard={false} centered
                dialogClassName={"animate-bottom"}>
                <div className="modalInnerCont">
                    <div className="modalHeader">
                        <p className="headerleftSide">
                            Select colors
                        </p>
                        <p className="headerRightSide" onClick={() => clearSelcetion()}>
                            <span>
                                Clear
                            </span>
                        </p>
                    </div>


                    <div className="container-fluid">
                        <div className="modalBodyContent">
                            <div className="row justify-content-md-center">
                                <div className="modalTelcosMain">
                                    {allColors.map((color, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className='colorBox'
                                                onClick={() => updateColors(color.name, color.selected)}
                                                style={{
                                                    border: `${color.name == '#FFFFFF' ? '1px' : '0px'} solid ${color.name == '#FFFFFF' && '#000000'}`,
                                                    backgroundColor: color.name,
                                                }}
                                            >
                                                {color.selected == true &&
                                                    <span>
                                                        <svg fill={'#FFFFFF'} height="60" width="60" viewBox="-4 0 18 8" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill={'#FFFFFF'} d="M9.97824 0.638224C9.91103 0.362739 9.69081 0.129476 9.41839 0.0422624C9.10236 -0.0587951 8.80849 0.0208047 8.53465 0.287292C7.66234 1.13382 6.79147 1.97827 5.91917 2.82411L3.60971 5.06191L2.63301 4.11709C2.22761 3.72463 1.82148 3.33286 1.41679 2.9397C1.198 2.72859 0.949896 2.65038 0.689635 2.70852C0.358589 2.7812 0.131218 2.98539 0.0346924 3.29825C-0.055398 3.58412 0.0304024 3.85614 0.287088 4.10533L3.01197 6.73974C3.18929 6.91002 3.3995 7 3.62186 7C3.84494 7 4.05801 6.90863 4.23605 6.73628C4.47415 6.50717 4.70867 6.27806 4.9439 6.04757L6.4068 4.62377C7.52077 3.53844 8.63404 2.45311 9.75015 1.37193C9.96108 1.16774 10.0433 0.901943 9.97824 0.638224Z" fill="white" />
                                                        </svg>
                                                    </span>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='modalSaveButton'>
                                    <button type="submit" value="Next" className={isChanged ? "login_btn_next" : "login_btn_next addItemDisable"} onClick={() => setShowColorPicker(false)} disabled={!isChanged}>
                                        Done
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddColor;