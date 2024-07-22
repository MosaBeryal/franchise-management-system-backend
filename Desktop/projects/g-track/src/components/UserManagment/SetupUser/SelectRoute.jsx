import { TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { useGetRouteMasterQuery } from "../../../Apis/RouteMasterApis/RouteMasterApis";
function SelectRoute({ setRouteId }) {
  const member_id = "4103";

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [letitude, setLetitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { data = [], error, isLoading } = useGetRouteMasterQuery(member_id);

  const handleRouteSelect = (event, newValue) => {
    setSelectedRoute(newValue);
    setRouteId(newValue?.id);

    setLetitude(newValue?.Latitude);
    setLongitude(newValue?.Longitude);
  };

  return (
    <div>
      {" "}
      <div className="flex  w-full gap-4">
        <Autocomplete
          options={data}
          className="!w-1/3"
          getOptionLabel={(option) => option.route_name}
          onChange={handleRouteSelect}
          value={selectedRoute}
          renderInput={(params) => (
            <TextField
              {...params}
              name="RouteName"
              label={"Route Name"}
              variant="outlined"
              size="small"
            />
          )}
        />
        <Autocomplete
          options={data}
          className="!w-1/3"
          getOptionLabel={(option) => option.gln_id_number}
          onChange={handleRouteSelect}
          value={selectedRoute}
          renderInput={(params) => (
            <TextField
              {...params}
              name="GLN ID Number"
              label="GLN ID Number"
              variant="outlined"
              size="small"
            />
          )}
        />

        <TextField
          name="RouteFullAddress"
          label={"Full Address"}
          variant="outlined"
          size="small"
          className="!w-1/3"
          value={selectedRoute ? selectedRoute.route_full_address : ""}
        />
      </div>
      <div className="flex mt-4 w-full gap-4">
        <TextField
          name="latitude"
          // label={t("Latitude")}
          label={"Latitude"}
          variant="outlined"
          clsassName="!w-1/3"
          size="small"
          value={selectedRoute ? selectedRoute.Latitude : ""}
        />
        <TextField
          name="longitude"
          // label={t("Longitude")}
          label={"Longitude"}
          variant="outlined"
          clsassName="!w-1/3"
          size="small"
          value={selectedRoute ? selectedRoute.Longitude : ""}
        />
        <TextField
          name="RouteArea"
          // label={t("Area")}
          label={"Area"}
          variant="outlined"
          clsassName="!w-1/3"
          value={selectedRoute ? selectedRoute.route_area : ""}
          size="small"
        />
      </div>
      <div className="w-full mt-4 flex gap-4">
        <TextField
          name="RouteCity"
          // label={t("City")}
          label={"City"}
          variant="outlined"
          size="small"
          clsassName="!w-1/3"
          value={selectedRoute ? selectedRoute.route_city : ""}
        />
        <TextField
          name="RouteStreet"
          // label={t("Street")}
          variant="outlined"
          label={"Street"}
          size="small"
          clsassName="!w-1/3"
          value={selectedRoute ? selectedRoute.route_street : ""}
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
          src={`https://www.google.com/maps/embed/v1/place?key=${
            import.meta.env.VITE_APP_MAP_KEY
          }&q=${letitude},${longitude}&zoom=14`}
        />
      </div>
    </div>
  );
}

export default SelectRoute;
