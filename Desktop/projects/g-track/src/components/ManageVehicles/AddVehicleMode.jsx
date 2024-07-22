import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  IconButton,
  TextField,
  DialogActions,
} from "@mui/material";
import ShowMessage from "../ShowMessage/ShowMessage";
import { useTranslation } from "react-i18next";
import { FaTruck } from "react-icons/fa";

// api call
import { useAddVehicleMutation } from "../../Apis/ManageVehiclesApis/VehiclesApis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddVehicleModel({ open, onClose }) {
  const { t, i18n } = useTranslation();
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [formValues, setFormValues] = useState({
    plate_number: "",
    make: "",
    model: "",
    year: "",
    color: "",
    owner: "",
    vin_number: "",
    gln_id_number: "",
    giai_number: "",
  });

  // api call
  const [addVehicle, { isLoading, isError, error, isSuccess }] = useAddVehicleMutation();

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (let key in formValues) {
      if (formValues[key] === "") {
        setMessage(`Please fill the ${key} field.`);
        setMessageType("error");
        setOpenMessage(true);
        return;
      }
    }
    // Convert Year to integer
    const formValuesWithYearAsInteger = {
      ...formValues,
      year: parseInt(formValues.year),
    };
    const response = await addVehicle({
      member_id: "4103",
      ...formValuesWithYearAsInteger,
    }).unwrap();
  };

  useEffect(() => {
    if (isError) {
      setMessage(error?.data?.message || "Something went wrong");
      setMessageType("error");
      setOpenMessage(true);
    } else if (isSuccess) {
      setMessage("Vehicle added successfully");
      setMessageType("success");
      setOpenMessage(true);
    }
  }, [isError, isSuccess]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex gap-2">
            <h2>{t("Add New Vehicle")} </h2>
            <FaTruck className="text-4xl ml-2" />
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            // [i18n.language === "ar" ? "left" : "right"]: 8,
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div className="flex  w-full gap-4">
              <TextField
                name="plate_number"
                label={t("Plate Number")}
                variant="outlined"
                size="small"
                value={formValues.plate_number}
                onChange={handleChange}
              />
              <TextField
                name="make"
                label={t("Make")}
                variant="outlined"
                size="small"
                value={formValues.make}
                onChange={handleChange}
              />
              <TextField
                name="model"
                label={t("Model")}
                variant="outlined"
                size="small"
                value={formValues.model}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-7 w-full gap-4">
              <TextField
                name="year"
                label={t("Year")}
                variant="outlined"
                type="number"
                size="small"
                value={formValues.year}
                onChange={handleChange}
              />
              <TextField
                name="color"
                label={t("Color")}
                variant="outlined"
                size="small"
                value={formValues.color}
                onChange={handleChange}
              />
              <TextField
                name="owner"
                label={t("Owner Name")}
                variant="outlined"
                size="small"
                value={formValues.owner}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-7 w-full gap-4">
              <TextField
                name="vin_number"
                label={t("VIN Number")}
                variant="outlined"
                size="small"
                value={formValues.vin_number}
                onChange={handleChange}
              />
              <TextField
                name="gln_id_number"
                label={t("GLN ID Number")}
                variant="outlined"
                size="small"
                value={formValues.gln_id_number}
                onChange={handleChange}
              />
              <TextField
                name="giai_number"
                label={t("GAI Number")}
                variant="outlined"
                size="small"
                value={formValues.giai_number}
                onChange={handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              autoFocus
              type="submit"
              onClick={onClose}
            >
              {isLoading ? "Adding..." : `${t("Add")}`}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      {/* Messages */}
      <ShowMessage
        open={openMessage}
        handleClose={() => setOpenMessage(false)}
        message={message}
        severity={messageType}
      />
    </React.Fragment>
  );
}
