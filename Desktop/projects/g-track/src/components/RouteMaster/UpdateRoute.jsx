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
import { CiRoute } from "react-icons/ci";
import { useTranslation } from "react-i18next";

// api call
import { usePutRouteMasterMutation } from "../../Apis/RouteMasterApis/RouteMasterApis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UpdateRoute({ open, onClose, selectedRow }) {
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const { t, i18n } = useTranslation();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [formValues, setFormValues] = useState({
    member_id: "4103",
    route_name: "",
    gln_id_number: "",
    Latitude: "",
    Longitude: "",
    route_full_address: "",
    route_area: "",
    route_city: "",
    route_street: "",
  });

  useEffect(() => {
    if (selectedRow) {
      const [latitude, longitude] = selectedRow.GPSValue.split(",");
      setLatitude(latitude);
      setLongitude(longitude);

      setFormValues({
        ...formValues,
        route_name: selectedRow.RouteName,
        gln_id_number: selectedRow.GLNIDNumber,
        route_full_address: selectedRow.RouteFullAddress,
        route_area: selectedRow.RouteArea,
        route_city: selectedRow.RouteCity,
        route_street: selectedRow.RouteStreet,
      });
    }
  }, [selectedRow]);

  //   api call
  const [updateRoute, { isLoading, isError, error, isSuccess }] =
    usePutRouteMasterMutation();

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const combinedFormValues = {
      ...formValues,
      Latitude: latitude,
      Longitude: longitude,
    };

    for (let key in combinedFormValues) {
      if (combinedFormValues[key] === "") {
        setMessage(`${t("Please fill the")} ${key} ${t("field")}.`);
        setMessageType("error");
        setOpenMessage(true);
        return;
      }
    }

    const payload = {
      id: selectedRow.RouteId,
      body: combinedFormValues,
    };

    const response = await updateRoute(payload).unwrap();
  };

  useEffect(() => {
    if (isError) {
      setMessage(error?.data?.message || "Something went wrong");
      setMessageType("error");
      setOpenMessage(true);
    } else if (isSuccess) {
      setMessage(`${t("User Updated successfully")}`);
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
            <h2>{t("Update Route")}</h2>
            <CiRoute className="text-2xl ml-2" />
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
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
                name="route_name"
                label="Route Name"
                variant="outlined"
                size="small"
                value={formValues.route_name}
                onChange={handleChange}
              />
              <TextField
                name="gln_id_number"
                label="GLN ID Number"
                variant="outlined"
                size="small"
                value={formValues.gln_id_number}
                onChange={handleChange}
              />
              <TextField
                name="Latitude"
                label="Latitude"
                variant="outlined"
                size="small"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
              <TextField
                name="Longitude"
                label="Longitude"
                variant="outlined"
                size="small"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              />
            </div>
            <div className="flex mt-7 w-full gap-4">
              <TextField
                name="route_full_address"
                label="Full Address"
                variant="outlined"
                size="small"
                value={formValues.route_full_address}
                onChange={handleChange}
              />
              <TextField
                name="route_area"
                label="Area"
                variant="outlined"
                size="small"
                value={formValues.route_area}
                onChange={handleChange}
              />
              <TextField
                name="route_city"
                label="City"
                variant="outlined"
                size="small"
                value={formValues.route_city}
                onChange={handleChange}
              />
              <TextField
                name="route_street"
                label="Street"
                variant="outlined"
                size="small"
                value={formValues.route_street}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mt-5">
              <iframe
                width="100%"
                height="200"
                style={{ border: 0 }}
                zoom="10"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_APP_MAP_KEY}&q=${latitude},${longitude}`}
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
              {isLoading ? "Updating..." : `${t('Update')}`}
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
