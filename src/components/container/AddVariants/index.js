import loader from '../../../assets/03_Loader.gif';
import AppDialog from '../../common/AppDialog';
import TopHeader from '../../common/TopHeader';
import AddColor from '../../common/AddColor';
import AddSize from '../../common/AddSize';
import React, { useState } from 'react';

const {innerHeight} = window;
const AddVariant = ({ setToggle, setShowVar, setVariants, variants, isEdit }) => {

    const [selectedColors, setSelectedColors] = useState(variants.color);
    const [selectedSizes, setSelectedSizes] = useState(variants.sizes);
    const [isChanged, setIsChanged] = useState(false);
    const [isVarAdded, setVarAdded] = useState(false);
    const [open, setOpen] = useState(false);

    const submitVariants = () => {
        setVariants({ 'color': [...selectedColors], 'sizes': [...selectedSizes] });
        setVarAdded(`VARIANTS ${isEdit ? "EDITTED" : "ADDED"} SUCCESSFULLY`);
        setTimeout(() => {
            setVarAdded(false);
            handleBack();
        }, 2000);
    }

    const handleBack = () => {

        if (open) setOpen(false);
        setToggle(false);
        setTimeout(() => {
            setShowVar(false);
        }, 500);
    }


    return (
        isVarAdded ?
            <div className="successfulCont">
                <img src={loader} alt="Check mark" title="check mark" style={{ resizeMode: 'cover', width: 150, height: 150, }} />
                <p>{isVarAdded}</p>
            </div>
            :
            <>
                <TopHeader onAction={() => {
                    if (isChanged) setOpen(true);
                    else handleBack();
                }}
                    title={`${isEdit ? "Edit" : "Add"} Variants`}
                />
                <div className="addvariantMain" style={{height: innerHeight * 0.8}}>
                    <AddSize setSelectedSizes={setSelectedSizes} selectedSizes={selectedSizes} setIsChanged={setIsChanged} />
                    <AddColor setSelectedColors={setSelectedColors} isChanged={isChanged} selectedColors={selectedColors} setIsChanged={setIsChanged} />
                </div>

                <div className="buttonContEditDtl" style={{height: innerHeight * 0.11}}>
                    <button type="submit" value="Next" className={isChanged ? "login_btn_next" : "login_btn_next addItemDisable"} disabled={!isChanged} onClick={() => submitVariants()}>
                         SAVE
                    </button>
                </div>

               
                <AppDialog
                    handleClose={() => setOpen(false)}
                    handleAction={handleBack}
                    setOpen={setOpen}
                    type="discard"
                    open={open}
                />

            </>
    )
}

export default AddVariant