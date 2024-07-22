import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  Box,
  Step,
  StepLabel,
  Stepper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";

// components
import SelectUser from "./SelectUser";
import SelectRoute from "./SelectRoute";
import SelectVehicle from "./SelectVehicle";
import ShowMessage from "../../ShowMessage/ShowMessage";

// api
import { useAssignUserMutation } from "../../../Apis/ManageUsersApis/UsersApis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// stepper
const steps = ["Select User", "Select Route", "Select Vehicle"];

export default function ConfigureUser({ open, handleClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const { t, i18n } = useTranslation();
  const [userId, setUserId] = useState(null);
  const [routeId, setRouteId] = useState(null);
  const [vehicleId, setVehicleId] = useState(null);

  //   message states
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  //   api call
  const [assignUser, { isLoading, isError, isSuccess, error }] =
    useAssignUserMutation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAssign = async () => {
    const payload = {
      member_id: "4103",
      user_id: userId,
      vehicle_id: vehicleId,
      route_id: routeId,
    };
    await assignUser(payload);
    handleClose();
    setActiveStep(0);
  };

  //   show message
  useEffect(() => {
    if (isSuccess) {
      setMessage(`${t("User assigned successfully")}`);
      setMessageType("success");
      setOpenMessage(true);
    } else if (isError) {
      setMessage("Failed to assign user");
      setMessageType("error");
      setOpenMessage(true);
    }
  }, [isSuccess, isError]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectUser setUserId={setUserId} />;
      case 1:
        return <SelectRoute setRouteId={setRouteId} />;
      case 2:
        return <SelectVehicle setVehicleId={setVehicleId} />;
      default:
        return <SelectUser setUserId={setUserId} />;
    }
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        width="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {t("Configure User")}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className="m-5">{getStepContent(activeStep)}</div>
          </Box>
        </DialogContent>
        <DialogActions className="!flex !justify-between !items-center">
          <Button
            variant="contained"
            autoFocu
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {t("Back")}
          </Button>
          <Button
            autoFocus
            variant="contained"
            disabled={isLoading}
            onClick={
              activeStep === steps.length - 1 ? handleAssign : handleNext
            }
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : activeStep === steps.length - 1 ? (
            `${t("Assign")}`
            ) : (
              `${t("Next")}`
            )}
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* show message */}
      <ShowMessage
        message={message}
        severity={messageType}
        open={openMessage}
        handleClose={() => setOpenMessage(false)}
      />
    </React.Fragment>
  );
}
