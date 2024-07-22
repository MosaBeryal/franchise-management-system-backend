import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  styled,
} from "@mui/material";

// components
import EmailAutocomplete from "./EmailAutocomplete";
import ShowMessage from "../../ShowMessage/ShowMessage";
// api call
import { useAssignSalesOrdersMutation } from "../../../Apis/SalesOrder/salesOrders";
import { useTranslation } from "react-i18next";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PickListModel({ open, onClose, selectedRows }) {
  const { t, i18n } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);

  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [assignSalesOrders, { isLoading, isError, isSuccess, error }] =
    useAssignSalesOrdersMutation();

  const handleAssignClick = async () => {
    if (selectedUser && selectedRows) {
      const {
        pickingRouteId,
        customer,
        inventoryLocationId,
        transactionReferenceId,
        itemId,
        quantity,
        expeditionStatus,
        configId,
        wmsLocationId,
        itemName,
      } = selectedRows;

      const data = {
        orders: [
          {
            member_id: "4103",
            user_id: selectedUser.user_id,
            pickingRouteId: pickingRouteId,
            customer: customer,
            inventLocationId: inventoryLocationId,
            transRefId: transactionReferenceId,
            itemId: itemId,
            qty: quantity,
            expeditionStatus: expeditionStatus,
            configId: configId,
            wmsLocationId: wmsLocationId,
            itemName: itemName,
            route_id: selectedUser.route_id,
            userAssignment_id: selectedUser.user_assignment_id,
            imgUrl: `https://picsum.photos/200/300?random=${Math.floor(
              Math.random() * 1000
            )}`,
          },
        ],
      };

      await assignSalesOrders(data);
    }
  };

  useEffect(() => {
    if (isError) {
      setOpenMessage(true);
      setMessage(error?.data?.error || "Failed to assign sales order");
      setSeverity("error");
    } else if (isSuccess) {
      setOpenMessage(true);
      setMessage("Sales order assigned successfully");
      setSeverity("success");
      onClose();
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
          {t("Assign Sales Order")}
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
        <DialogContent>
          <EmailAutocomplete setSelectedUser={setSelectedUser} />
          <Button
            onClick={handleAssignClick}
            variant="contained"
            color="primary"
            sx={{ float: "right", marginTop: "10px" }}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Assign"
            )}
          </Button>
        </DialogContent>
      </BootstrapDialog>

      <ShowMessage
        message={message}
        severity={severity}
        open={openMessage}
        handleClose={() => setOpenMessage(false)}
      />
    </React.Fragment>
  );
}
