import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IoWarningOutline } from "react-icons/io5";
import ShowMessage from "../ShowMessage/ShowMessage";

// api
import { useDeleteUserMutation } from "../../Apis/ManageUsersApis/UsersApis";

export default function DeleteUser({ open, onClose, seletecRowId }) {
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [deleteUser, { isLoading, error, isSuccess, isError }] =
    useDeleteUserMutation();

  const handleDelte = async () => {
    await deleteUser(seletecRowId);
    onClose();
  };

  //  error handling
  useEffect(() => {
    if (isError) {
      setMessage("Something went wrong. Please try again later.");
      setMessageType("error");
      setOpenMessage(true);
    } else if (isSuccess) {
      setMessage("Vehicle Deleted Successfully");
      setMessageType("success");
      setOpenMessage(true);
    }
  }, [isError, isSuccess]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <div className="flex  m-4 gap gap-2">
          <div className="w-12 h-10 flex justify-center   mt-5 items-center bg-red-100 rounded-full ">
            <IoWarningOutline className="text-2xl text-center  text-red-600" />
          </div>
          <div>
            <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete This User? This action cannot be
                undone.
              </DialogContentText>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={onClose}>
            Cencel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelte}
            autoFocus
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* message */}
      <ShowMessage
        open={openMessage}
        handleClose={() => setOpenMessage(false)}
        message={message}
        severity={messageType}
      />
    </React.Fragment>
  );
}
