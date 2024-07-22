import { TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { useGetUsersQuery } from "../../../Apis/ManageUsersApis/UsersApis";
import { useTranslation } from "react-i18next";

function SelectUser({ setUserId }) {
  const member_id = "4103";

  const { data = [], error, isLoading } = useGetUsersQuery(member_id);

  const [selectedUser, setSelectedUser] = useState(null);

  const { t, i18n } = useTranslation();
  const handleUserSelect = (event, newValue) => {
    setSelectedUser(newValue);
    setUserId(newValue?.id);
  };

  return (
    <div>
      <div className="flex  w-full gap-4">
        <Autocomplete
          options={data}
          className="!w-1/3"
          getOptionLabel={(option) => option.name}
          onChange={handleUserSelect}
          value={selectedUser}
          renderInput={(params) => (
            <TextField
              {...params}
              name="UserFullName"
              label={t("Full Name")}
              variant="outlined"
              size="small"
            />
          )}
        />

        <Autocomplete
          options={data}
          getOptionLabel={(option) => option.email}
          onChange={handleUserSelect}
          className="!w-1/3"
          value={selectedUser}
          renderInput={(params) => (
            <TextField
              {...params}
              name="email"
              label="Email"
              variant="outlined"
              size="small"
            />
          )}
        />
        <TextField
          name="MobileNo"
          label={t("Mobile No")}
          variant="outlined"
          className="!w-1/3"
          size="small"
          value={selectedUser ? selectedUser.mobile_number : ""}
        />
      </div>
      <div className="flex mt-7 w-full gap-4">
        <TextField
          name="ResidenceIDNo"
          label={t("Residence ID No")}
          variant="outlined"
          size="small"
          value={selectedUser ? selectedUser.residence_id_number : ""}
        />
        <TextField
          name="NationalAddressQRCode"
          label={t("National Address QR Code")}
          variant="outlined"
          size="small"
          value={selectedUser ? selectedUser.national_address_qrcode : ""}
        />
        <TextField
          name="Role"
          label={t("Role")}
          variant="outlined"
          size="small"
          value={selectedUser ? selectedUser.role : ""}
        />
      </div>
    </div>
  );
}

export default SelectUser;
