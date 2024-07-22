import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  IconButton,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ShowMessage from "../ShowMessage/ShowMessage";
import { FaTruck } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";

// api call
import { useUpdateUserMutation } from "../../Apis/ManageUsersApis/UsersApis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UpdateUserDialog({ open, onClose, selectedRow }) {
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    gsrn_id_number: "",
    mobile_number: "",
    residence_id_number: "",
    national_address_qrcode: "",
    role: "",
  });

  useEffect(() => {
    if (selectedRow) {
      setFormValues({
        name: selectedRow.UserFullName,
        email: selectedRow.email,
        password: "",
        gsrn_id_number: selectedRow.GSRNIdNo,
        mobile_number: selectedRow.MobileNo,
        residence_id_number: selectedRow.ResidenceIDNo,
        national_address_qrcode: selectedRow.NationalAddressQRCode,
        role: selectedRow.role,
      });
    }
  }, [selectedRow]);

  // api call
  const [updateUser, { isLoading, isError, error, isSuccess }] =
    useUpdateUserMutation();

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (let key in formValues) {
      if (formValues[key] === "" && key !== "password") {
        setMessage(`Please fill the${key} field`);
        setMessageType("error");
        setOpenMessage(true);
        return;
      }
    }
    let payloadBody = { ...formValues };
    if (payloadBody.password === "") {
      delete payloadBody.password;
    }
    const payload = {
      id: selectedRow.UserId,
      body: payloadBody,
    };
    const response = await updateUser(payload).unwrap();
  };

  useEffect(() => {
    if (isError) {
      setMessage(error?.data?.message || "Something went wrong");
      setMessageType("error");
      setOpenMessage(true);
    } else if (isSuccess) {
      setMessage("User updated successfully");
      setMessageType("success");
      setOpenMessage(true);
    }
  }, [isError, isSuccess, error]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="flex gap-2">
            <h2>{"Update User"}</h2>
            <FaUsersGear className="text-4xl ml-2" />
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
                name="name"
                label="Full Name"
                variant="outlined"
                size="small"
                value={formValues.name}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label={"Email"}
                variant="outlined"
                size="small"
                value={formValues.email}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Update Password Optional"
                variant="outlined"
                size="small"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-7 w-full gap-4">
              <TextField
                name="gsrn_id_number"
                label="GSRN ID No"
                variant="outlined"
                size="small"
                value={formValues.gsrn_id_number}
                onChange={handleChange}
              />
              <TextField
                name="mobile_number"
                label="Mobile No"
                variant="outlined"
                size="small"
                value={formValues.mobile_number}
                onChange={handleChange}
              />
              <TextField
                name="residence_id_number"
                label="Residence ID No"
                variant="outlined"
                size="small"
                value={formValues.residence_id_number}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-7 w-full gap-4">
              <TextField
                name="national_address_qrcode"
                label="National Address QR Code"
                variant="outlined"
                size="small"
                value={formValues.national_address_qrcode}
                onChange={handleChange}
              />
              <FormControl className="!w-1/3">
                <InputLabel id="demo-simple-select-label">
                  {"Role"}
                </InputLabel>
                <Select
                  name="role"
                  labelId="demo-simple-select-label"
                  value={formValues.role}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  label="Role"
                >
                  <MenuItem value={"driver"}>Driver</MenuItem>
                  <MenuItem value={"salesman"}>Salesman</MenuItem>
                </Select>
              </FormControl>
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
              {isLoading ? "Updating..." : `Update`}
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
