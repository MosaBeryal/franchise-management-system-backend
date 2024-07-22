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
import { useTranslation } from "react-i18next";

// api
import { useDeleteVehicleMutation } from "../../Apis/ManageVehiclesApis/VehiclesApis";

export default function DeleteVehicle({ open, onClose, seletecRowId }) {
  const { t, i18n } = useTranslation();
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [deleteVehicle, { isLoading, error, isSuccess, isError }] =
    useDeleteVehicleMutation();

  const handleDelte = async () => {
    await deleteVehicle(seletecRowId);
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
            <DialogTitle id="alert-dialog-title">
              {t("Delete Vehicle")}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {t(
                  "Are you sure you want to delete This Vehcile? This action cannot be undone"
                )}
                .
              </DialogContentText>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={onClose}>
            {t("Cencel")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelte}
            autoFocus
          >
            {isLoading ? "Deleting..." : `${t("Delete")}`}
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
