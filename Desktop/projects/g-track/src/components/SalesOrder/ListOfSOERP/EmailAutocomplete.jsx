import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetUserEmailsQuery } from "../../../Apis/SalesOrder/salesOrders";
import { useTranslation } from "react-i18next";

export default function Asynchronous({ setSelectedUser }) {

  const member_id = "4103";

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const { t, i18n } = useTranslation();

  const { data = [], isLoading } = useGetUserEmailsQuery(member_id);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!loading || !data) {
      return undefined;
    }

    setOptions(data);
  }, [loading, data]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="proute-users-emails"
      sx={{ width: 400 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.UserId === value.UserId}
      // getOptionLabel={(option) => option.user_name}
      getOptionLabel={(option) => `${option.user_name} - ${option.route_name}`}
      options={options}
      loading={isLoading}
      onChange={(event, newValue) => {
        setSelectedUser(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("Assign Sales Order")}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
