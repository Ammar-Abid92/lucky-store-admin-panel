
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const ShippingOptionDialog = ({ open, onClose, handleClose, handleAction }) => {

    return (
        <Dialog open={open} onClose={onClose}
            aria-labelledby="choose-shipping"
            aria-describedby="alert-dialog-description"
            className="DeletPopup"
        >
            <DialogContent>
                <DialogContentText>
                    We Will deliver anywhere witin the country
                </DialogContentText>
                <DialogActions>
                    <Button className="NoButton" onClick={handleClose}>

                        I will ship myself
                    </Button>
                    <Button className='YesButton' onClick={handleAction}>
                        Ship Order With Toko
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default ShippingOptionDialog