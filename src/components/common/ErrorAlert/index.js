import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button'

const ErrorAlert = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText>
                    The data file you uploaded is not in required format.
                </DialogContentText>
                <DialogContentText>

                    {/* <p className="placeholderParagraph">
                        Create item with names, photos and prices to speed-up checkout. <a href="https://sell.toko.pk/jlmenu.csv">Download our template</a> to create and update your item with import.
                    </p> */}
                    <span>Please download sample data template</span> <a href='https://sell.toko.pk/jlmenu.csv' onClick={onClose}>here.</a>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} className='YesButton'>Okay</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorAlert