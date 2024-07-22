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
import { useUpdateVehicleMutation } from "../../Apis/ManageVehiclesApis/VehiclesApis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UpdateVehicle({ open, onClose, selectedRow }) {
  const { t, i18n } = useTranslation();
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [initialFormValues, setInitialFormValues] = useState({});
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

  useEffect(() => {
    if (selectedRow) {
      const initialValues = {
        plate_number: selectedRow.PlateNo,
        make: selectedRow.Make,
        model: selectedRow.Model,
        year: selectedRow.Year.toString(),
        color: selectedRow.Color,
        owner: selectedRow.OwnerName,
        vin_number: selectedRow.VehicleVinNumber,
        gln_id_number: selectedRow.GLNIDNumber,
        giai_number: selectedRow.GIAINumber,
      };
      setFormValues(initialValues);
      setInitialFormValues(initialValues);
    }
  }, [selectedRow]);

  const [updateVehicle, { isLoading, isError, error, isSuccess }] = useUpdateVehicleMutation();

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const modifiedValues = Object.keys(formValues).reduce((result, key) => {
      if (formValues[key] !== initialFormValues[key]) {
        result[key] = formValues[key];
      }
      return result;
    }, {});

    if (modifiedValues.year) {
      modifiedValues.year = parseInt(modifiedValues.year);
    }

    const response = await updateVehicle({
      id: selectedRow.VehicleIdNo,
      body: modifiedValues,
    }).unwrap();
  };

  useEffect(() => {
    if (isError) {
      setMessage(error?.data?.message || "Something went wrong");
      setMessageType("error");
      setOpenMessage(true);
    } else if (isSuccess) {
      setMessage("Vehicle updated successfully");
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
            <h2>Update Vehicle</h2>
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
            <div className="flex w-full gap-4">
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
              {isLoading ? "Updating..." : `${t("Update")}`}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      <ShowMessage
        open={openMessage}
        handleClose={() => setOpenMessage(false)}
        message={message}
        severity={messageType}
      />
    </React.Fragment>
  );
}