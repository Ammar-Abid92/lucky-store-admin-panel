import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { Spinner } from "react-bootstrap";
import React from "react";

const AppDialog = ({
  open,
  setOpen,
  handleAction,
  handleClose,
  type,
  load,
}) => {
  return (
    <Dialog
      className="DeletPopup"
      open={open}
      onClose={() => (load ? {} : setOpen(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {type === "delete"
            ? "Are you sure you want to delete Item?"
            : type === "cancelItem"
            ? "Are you sure you want to cancel the changes?"
            : type === "deleteCat"
            ? "Are you sure you want to delete category?"
            : type === "decline"
            ? "Are you sure you want to decline this order? You can't accept this order later"
            : type === "cancel"
            ? "Are you sure you want to cancel this order? You can't accept this order later"
            : type === "accepted"
            ? "would you like to accept this order ?"
            : type === "delivered"
            ? "Are you sure you have delivered this order ?"
            : type === "shipped"
            ? "Are you ready to ship the order ?"
            : type === "discard"
            ? "Going back will discard your changes"
            : type === "exist"
            ? "Item already exist"
            : "Are you sure you want to logout?"}
        </DialogContentText>
      </DialogContent>
      {load ? (
        <Spinner
          className="loaderCircle ProductsList"
          animation="border"
          role="status"
        ></Spinner>
      ) : (
        <DialogActions>
          <Button
            className="NoButton"
            onClick={() => handleClose(false)}
            color="primary"
          >
            {type === "exist" ? "Close" : "No"}
          </Button>
          {type === "exist" ? null : (
            <Button
              className="YesButton"
              onClick={() => handleAction()}
              color="primary"
              autoFocus
            >
              {type === "accepted"
                ? "Yes, accept"
                : type === "shipped"
                ? "Yes, Ship it"
                : type === "delivered"
                ? "Yes, deliver"
                : type === "decline"
                ? "Yes, decline"
                : type === "delete" ||
                  type === "deleteCat" ||
                  type === "discard" ||
                  !type
                ? "Yes"
                : "Yes, cancel"}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AppDialog;
