import { TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { useGetVehiclesQuery } from "../../../Apis/ManageVehiclesApis/VehiclesApis";
import { useTranslation } from "react-i18next";

function SelectVehicle({ setVehicleId }) {
  
  const { t, i18n } = useTranslation();
  const member_id = "4103";

  const { data = [], error, isLoading } = useGetVehiclesQuery(member_id);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleSelect = (event, newValue) => {
    setSelectedVehicle(newValue);
    setVehicleId(newValue?.id);
  };

  return (
    <div>
      <div className="flex  w-full gap-4">
        <Autocomplete
          options={data}
          getOptionLabel={(option) => option.plate_number}
          onChange={handleVehicleSelect}
          value={selectedVehicle}
          className="!w-1/3"
          renderInput={(params) => (
            <TextField
              {...params}
              name="PlateNo"
              label={t("Plate Number")}
              variant="outlined"
              size="small"
            />
          )}
        />
        <Autocomplete
          options={data}
          getOptionLabel={(option) => option.vin_number}
          onChange={handleVehicleSelect}
          value={selectedVehicle}
          className="!w-1/3"
          renderInput={(params) => (
            <TextField
              {...params}
              name="VehicleVinNumber"
              label={t("VIN Number")}
              variant="outlined"
              size="small"
            />
          )}
        />
        <TextField
          name="Make"
          label={t("Make")}
          variant="outlined"
          className="!w-1/3"
          size="small"
          value={selectedVehicle ? selectedVehicle.make : ""}
        />
      </div>
      <div className="flex mt-7 w-full gap-4">
        <TextField
          name="Model"
          label={t("Model")}
          variant="outlined"
          size="small"
          value={selectedVehicle ? selectedVehicle.model : ""}
        />
        <TextField
          name="Year"
          label={t("Year")}
          variant="outlined"
          type="number"
          size="small"
          value={selectedVehicle ? selectedVehicle.year : ""}
        />
        <TextField
          name="Color"
          label={t("Color")}
          variant="outlined"
          size="small"
          value={selectedVehicle ? selectedVehicle.color : ""}
        />
      </div>
      <div className="flex mt-7 w-full gap-4">
        <TextField
          name="OwnerName"
          label={t("OwnerName")}
          variant="outlined"
          size="small"
          value={selectedVehicle ? selectedVehicle.owner : ""}
        />
        <TextField
          name="GLNIDNumber"
          label={t("GLNID Number")}
          variant="outlined"
          size="small"
          value={selectedVehicle ? selectedVehicle.gln_id_number : ""}
        />
        <TextField
          name="GIAINumber"
          label={t("GIAI Number")}
          variant="outlined"
          size="small"
          value={selectedVehicle ? selectedVehicle.giai_number : ""}
        />
      </div>
    </div>
  );
}

export default SelectVehicle;
