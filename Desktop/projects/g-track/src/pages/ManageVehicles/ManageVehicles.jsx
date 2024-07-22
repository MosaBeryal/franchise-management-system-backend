import MainLayout from "../../layout/MainLayout";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Button, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

// dialogs
import AddVehicleModel from "../../components/ManageVehicles/AddVehicleMode";
import UpdateVehicle from "../../components/ManageVehicles/UpdateVehicle";
import DeleteVehicle from "../../components/ManageVehicles/DeleteVehicle";

// apis
import { useGetVehiclesQuery } from "../../Apis/ManageVehiclesApis/VehiclesApis";

function ManageVehicles() {
  const member_id = "4103";

  const [openAddVehicle, setOpenAddVehicle] = useState(false);
  const [openUpdateVehicle, setOpenUpdateVehicle] = useState(false);
  const [openDeleteVehicle, setOpenDeleteVehicle] = useState(false);
  const { data, error, isLoading } = useGetVehiclesQuery(member_id);
  const [selectedRow, setSelectedRow] = useState(null);
  const { t, i18n } = useTranslation();

  const columns = (t) => [
    {
      field: "VehicleIdNo",
      headerName: t("Vehicle ID"),
      type: "number",
      width: 80,
      align: "center",
    },
    {
      field: "PlateNo",
      headerName: t("Plate Number"),
      type: "string",
      width: 130,
    },
    { field: "Make", headerName: t("Make"), type: "string", width: 130 },
    { field: "Model", headerName: t("Model"), type: "string", width: 130 },
    { field: "Year", headerName: t("Year"), type: "number", width: 130 },
    { field: "Color", headerName: t("Color"), type: "string", width: 130 },

    {
      field: "OwnerName",
      headerName: t("Owner Name"),
      type: "string",
      width: 130,
    },
    {
      field: "VehicleVinNumber",
      headerName: t("Vehicle VIN Number"),
      type: "string",
      width: 180,
    },
    {
      field: "GLNIDNumber",
      headerName: t("GLN ID Number"),
      type: "string",
      width: 150,
    },
    {
      field: "GIAINumber",
      headerName: t("GIAI Number"),
      type: "string",
      width: 150,
    },
    {
      field: "action",
      headerName: t("Action"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center">
          {/* <Tooltip title="View Vehicle">
            <IconButton
              onClick={() => {
                console.log("View", params.row.id);
              }}
            >
              <IoEye className="text-black text-xl" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title={t("Edit Vehicle")}>
            <IconButton onClick={() => setOpenUpdateVehicle(true)}>
              <CiEdit className="text-black text-xl" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Delete Vehicle")}>
            <IconButton
              onClick={() => {
                setOpenDeleteVehicle(true);
              }}
            >
              <MdDelete className="text-black text-xl" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = data
    ? data.map((vehicle, index) => ({
        id: index + 1,
        VehicleIdNo: vehicle.id,
        PlateNo: vehicle.plate_number,
        Make: vehicle.make,
        Model: vehicle.model,
        Year: vehicle.year,
        Color: vehicle.color,
        OwnerName: vehicle.owner,
        VehicleVinNumber: vehicle.vin_number,
        GLNIDNumber: vehicle.gln_id_number,
        GIAINumber: vehicle.giai_number,
      }))
    : [];

  return (
    <MainLayout>
      <section className="p-5">
        <h1
          className={`text-2xl ${
            i18n.language == "ar" ? "text-end" : "text-start"
          }`}
        >
          {t("Manage Vehicle")}
        </h1>

        <div className="flex justify-end items-center px-4 mt-10">
          <Button
            onClick={() => setOpenAddVehicle(true)}
            variant="contained"
            color="primary"
          >
            {t("Add Vehicle")}
          </Button>
        </div>

        <DataGrid
          rows={rows}
          // columns={columns}
          columns={i18n.language == "ar" ? columns(t).reverse() : columns(t)}
          onRowClick={(params) => {
            setSelectedRow(params.row);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          // checkboxSelection
          // disableRowSelectionOnClick
          className="!w-full !h-full !mt-10 !border-2"
          sx={{
            "&.MuiDataGrid-root .MuiIconButton-root": {
              // color: "white !important",
            },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: () => (
              <span className="text-red-500">{t("No data found")}</span>
            ),
            noResultsOverlay: () => (
              <span className="text-red-500">{t("No results found")}</span>
            ),
          }}
          loading={isLoading}
        />

        {/* dialogs */}

        <AddVehicleModel
          open={openAddVehicle}
          onClose={() => setOpenAddVehicle(false)}
        />

        <UpdateVehicle
          open={openUpdateVehicle}
          onClose={() => setOpenUpdateVehicle(false)}
          selectedRow={selectedRow}
        />

        <DeleteVehicle
          open={openDeleteVehicle}
          onClose={() => setOpenDeleteVehicle(false)}
          seletecRowId={selectedRow?.VehicleIdNo}
        />
      </section>
    </MainLayout>
  );
}

export default ManageVehicles;
