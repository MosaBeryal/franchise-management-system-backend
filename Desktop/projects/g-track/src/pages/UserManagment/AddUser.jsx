import MainLayout from "../../layout/MainLayout";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Button, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { FaUsersGear } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

// dialogs
import NewUserDialog from "../../components/UserManagment/AddUser";
import UpdateUser from "../../components/UserManagment/UpdateUser";
import DeleteVehicle from "../../components/UserManagment/DeleteUser";

// apis
import { useGetUsersQuery } from "../../Apis/ManageUsersApis/UsersApis";

function AddUser() {
  const member_id = "4103";

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const { data, error, isLoading } = useGetUsersQuery(member_id);
  const [selectedRow, setSelectedRow] = useState(null);
  const { t, i18n } = useTranslation();

  const columns = [
    {
      field: "UserFullName",
      headerName: t("Full Name"),
      type: "string",
      width: 150,
    },
    {
      field: "GSRNIdNo",
      headerName: t("GSRN ID No"),
      type: "string",
      width: 150,
    },
    {
      field: "MobileNo",
      headerName: t("Mobile No"),
      type: "string",
      width: 130,
    },
    {
      field: "ResidenceIDNo",
      headerName: t("Residence ID No"),
      type: "string",
      width: 180,
    },
    {
      field: "NationalAddressQRCode",
      headerName: t("National Address QR Code"),
      type: "string",
      width: 200,
    },
    {
      field: "role",
      headerName: t("Role"),
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
          {/* <Tooltip title="View Vehicle">
            <IconButton
              onClick={() => {
                console.log("View", params.row.id);
              }}
            >
              <IoEye className="text-black text-xl" />
            </IconButton>
          </Tooltip> */}
          <Tooltip title={t("Edit User")}>
            <IconButton onClick={() => setOpenUpdateUser(true)}>
              <CiEdit className="text-black text-xl" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Delete User")}>
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
    ? data?.map((user, index) => ({
        id: index + 1,
        UserId: user.id,
        email: user.email,
        UserFullName: user.name,
        GSRNIdNo: user.gsrn_id_number,
        MobileNo: user.mobile_number,
        ResidenceIDNo: user.residence_id_number,
        NationalAddressQRCode: user.national_address_qrcode,
        role: user.role,
      }))
    : [];

  return (
    <>
      <section className="p-5">
        <div
          className={`flex gap-4 ${
            i18n.language === "ar" ? "justify-end" : "justify-start"
          }`}
        >
          <h1 className="text-2xl">{t("Add Users")}</h1>
          <FaUsersGear className="text-3xl text-black" />
        </div>

        <div
          className={`flex  items-center px-4 mt-10 ${
            i18n.language === "ar" ? "justify-start" : "justify-end"
          }`}
        >
          <Button
            onClick={() => setOpenAddUser(true)}
            variant="contained"
            color="primary"
          >
            {t("Add New User")}
          </Button>
        </div>

        <DataGrid
          rows={rows}
          // columns={columns}
          columns={i18n.language === "ar" ? columns.reverse() : columns}
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

        <NewUserDialog
          open={openAddUser}
          onClose={() => setOpenAddUser(false)}
        />

        <UpdateUser
          open={openUpdateUser}
          onClose={() => setOpenUpdateUser(false)}
          selectedRow={selectedRow}
        />

        <DeleteVehicle
          open={openDeleteUser}
          onClose={() => setOpenDeleteUser(false)}
          seletecRowId={selectedRow?.UserId}
        />
      </section>
    </>
  );
}

export default AddUser;
