import React from "react";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import {
  FaFileInvoiceDollar,
  FaUser,
  FaTruckMoving,
  FaRoute,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function ViewSalesOrderDrawer({ open, onClose, data }) {
  if (!data) {
    return; // or some loading indicator
  }
  const {
    pickingRouteId,
    inventLocationId,
    itemId,
    qty,
    customer,
    expeditionStatus,
    wmsLocationId,
    transRefId,
    configId,
    itemName,
    userAssignment,
  } = data;
  const { user = {}, vehicle = {}, route = {} } = userAssignment;

  const latitude = route?.Latitude
    ? parseFloat(route?.Latitude.trim())
    : undefined;
  const longitude = route?.Longitude
    ? parseFloat(route?.Longitude.trim())
    : undefined;

  return (
    <Drawer
      PaperProps={{
        sx: { width: "38%" },
      }}
      open={open}
      onClose={onClose}
    >
      <div className="flex justify-end mt-2">
        <IconButton onClick={onClose}>
          <IoClose className="text-2xl text-gray-700" />
        </IconButton>
      </div>

      {/* Sales Order Info */}
      <div className="m-5">
        <div className="flex gap-2 border-b mt-4 pb-3">
          <FaFileInvoiceDollar className="text-2xl text-gray-700" />
          <h1 className="font-semibold text-xl text-gray-700">
            Sales Order Info
          </h1>
        </div>
        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Picking RouteId: {pickingRouteId}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Inventory LocationId: {inventLocationId}
            </h1>
          </div>
        </div>

        <div className="mt-4 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Item Id: {itemId}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Config Id: {configId}
            </h1>
          </div>
        </div>

        <div className="mt-4 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Quantity: {qty}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Customer: {customer}
            </h1>
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Expedition Status: {expeditionStatus}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Assigned To User Id: {user.id}
            </h1>
          </div>
        </div>

        <div className="mt-4 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              WMS Location Id: {wmsLocationId}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Trans Ref Id: {transRefId}
            </h1>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-wrap">
          <h1 className="text-gray-700 text-sm font-semibold ">
            Item Name: {itemName}
          </h1>
        </div>
      </div>

      {/* User Info */}
      {userAssignment && (
        <div className="m-5">
          <div className="flex gap-2 border-b mt-4 pb-3">
            <FaUser className="text-2xl text-gray-700" />
            <h1 className="font-semibold text-xl text-gray-700">User Info</h1>
          </div>
          <div className="mt-5 flex w-full">
            <div className="w-1/2">
              <h1 className="text-gray-700 text-sm font-semibold ">
                User Full Name: {user?.name}
              </h1>
            </div>
            <div className="w-1/2">
              <h1 className="text-gray-700 text-sm font-semibold ">
                GSRN Id No: {user?.gsrn_id_number}
              </h1>
            </div>
          </div>

          <div className="mt-5 flex w-full">
            <div className="w-1/2">
              <h1 className="text-gray-700 text-sm font-semibold ">
                Mobile No: {user?.mobile_number}
              </h1>
            </div>
            <div className="w-1/2">
              <h1 className="text-gray-700 text-sm font-semibold ">
                Residence ID No: {user?.residence_id_number}
              </h1>
            </div>
          </div>

          <div className="mt-5 flex w-full">
            <div className="w-1/2">
              <h1 className="text-gray-700 text-sm font-semibold ">
                National Address QR Code: {user?.national_address_qrcode}
              </h1>
            </div>
            <div className="w-1/2">
              <h1 className="text-gray-700 text-sm font-semibold ">
                Role: {user?.role}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Info */}
      <div className="m-5">
        <div className="flex gap-2 border-b mt-4 pb-3">
          <FaTruckMoving className="text-2xl text-gray-700" />
          <h1 className="font-semibold text-xl text-gray-700">Vehicle Info</h1>
        </div>
        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Plate No: {vehicle?.plate_number}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ml-4 ">
              Model: {vehicle?.model}
            </h1>
          </div>
        </div>
        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Make: {vehicle?.make}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ml-4 ">
              Year: {vehicle?.year}
            </h1>
          </div>
        </div>

        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Color: {vehicle?.color}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ml-4 ">
              Owner Name: {vehicle?.owner}
            </h1>
          </div>
        </div>

        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Vehicle Vin Number: {vehicle?.vin_number}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ml-4 ">
              GLN ID Number: {vehicle?.gln_id_number}
            </h1>
          </div>
        </div>

        <div className="mt-5 flex w-full">
          <h1 className="text-gray-700 text-sm font-semibold">
            GIAI Number: {vehicle?.giai_number}
          </h1>
        </div>
      </div>

      {/* Route Info */}
      <div className="m-5">
        <div className="flex gap-2 border-b mt-4 pb-3">
          <FaRoute className="text-2xl text-gray-700" />
          <h1 className="font-semibold text-xl text-gray-700">Route Info</h1>
        </div>
        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Route Name: {route?.route_name}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              GPS Value: {route?.Latitude},{route?.Longitude}
            </h1>
          </div>
        </div>
        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              GLN ID Number: {route?.gln_id_number}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Route Full Address: {route?.route_full_address}
            </h1>
          </div>
        </div>

        <div className="mt-5 flex w-full">
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Route Area: {route?.route_area}
            </h1>
          </div>
          <div className="w-1/2">
            <h1 className="text-gray-700 text-sm font-semibold ">
              Route City: {route?.route_city}
            </h1>
          </div>
        </div>

        <div className="mt-5 flex w-full mb-5">
          <h1 className="text-gray-700 text-sm font-semibold ">
            Route Street: {route?.route_street}
          </h1>
        </div>

        {latitude && longitude && (
          <iframe
            width="100%"
            height="200"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_APP_MAP_KEY}&q=${latitude},${longitude}`}
          />
        )}
      </div>
    </Drawer>
  );
}
