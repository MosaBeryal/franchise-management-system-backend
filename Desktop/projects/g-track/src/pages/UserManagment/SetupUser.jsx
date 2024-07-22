import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
// import { IoEye } from "react-icons/io5";
import { Button, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { LuUserCog2 } from "react-icons/lu";

// apis
import {
  useGetUserAssignmentQuery,
  useDeleteUserAssignmentMutation,
} from "../../Apis/ManageUsersApis/UsersApis";
import { useTranslation } from "react-i18next";

// models
import ConfigureUser from "../../components/UserManagment/SetupUser/ConfigureUser";
import DeleteAssignedUser from "../../components/UserManagment/SetupUser/DeleteAssignUser";

function UserSetup() {
  const member_id = "4103";
  const [openAddUser, setOpenAddUser] = useState(false);
  // const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { t, i18n } = useTranslation();

  // apis
  const { data, error, isLoading } = useGetUserAssignmentQuery(member_id);

  console.log("data", data);

  const columns = [
    {
      field: "UserFullName",
      headerName: t("User Name"),
      type: "string",
      width: 150,
    },
    {
      field: "role",
      headerName: t("Role"),
      type: "string",
    },
    {
      field: "RouteName",
      headerName: t("Route Name"),
      type: "string",
      width: 130,
    },
    {
      field: "GPSValue",
      headerName: t("GPS Location"),
      type: "string",
      width: 180,
    },
    {
      field: "PlateNo",
      headerName: t("Vehicle PlateNo"),
      type: "string",
      width: 130,
    },
    {
      field: "Model",
      headerName: t("Vehicle Model"),
      type: "string",
      width: 130,
    },
    {
      field: "action",
      headerName: t("Action"),
      headerAlign: "center",
      align: "center",
      sortable: false,

      renderCell: (params) => (
        <div className="flex justify-center">
          <Tooltip title="Delete User ">
            <IconButton
              onClick={() => {
                setOpenDeleteUser(true);
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
    ? data.map((item) => ({
        id: item.id,
        UserFullName: item.user.name,
        role: item.user.role,
        RouteName: item.route.route_name,
        GPSValue: `${item.route.Latitude}, ${item.route.Longitude}`,
        PlateNo: item.vehicle.plate_number,
        Model: item.vehicle.model,
      }))
    : [];


  return (
    <>
      <section className="p-5">
        <div className={`flex gap-4 ${
            i18n.language === "ar" ? "justify-end" : "justify-start"
          }`}
        >
          <h1 className="text-2xl">{t("User Setup")}</h1>
          <LuUserCog2 className="text-3xl text-black" />
        </div>

        <div
          className={`flex  items-center px-4 mt-10 ${
            i18n.language == "ar" ? "justify-start" : "justify-end"
          }`}
        >
          <Button
            onClick={() => setOpenAddUser(true)}
            variant="contained"
            color="primary"
          >
            {t("Configure User")}
          </Button>
        </div>

        <DataGrid
          rows={rows}
          // columns={columns}
          columns={i18n.language == "ar" ? columns.reverse() : columns}
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
        <ConfigureUser
          open={openAddUser}
          handleClose={() => setOpenAddUser(false)}
        />
        <DeleteAssignedUser
          open={openDeleteUser}
          onClose={() => setOpenDeleteUser(false)}
          seletecRowId={selectedRow?.id}
        />
      </section>
    </>
  );
}

export default UserSetup;
