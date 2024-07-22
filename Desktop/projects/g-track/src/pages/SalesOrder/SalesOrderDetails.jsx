import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

// api call
import { useGetAllAssignedOrdersQuery } from "../../Apis/SalesOrder/salesOrders";

// components
import DeleteAssignedSalesOrderDialog from "../../components/SalesOrder/SalesOrderDetail/DeleteAssigedSO";
import ViewSalesOrderDrawer from "../../components/SalesOrder/SalesOrderDetail/ViewSalesOrder";

function SalesOrderDetials() {
  const member_id = "4103";

  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [viewSalesOrder, setViewSalesOrder] = useState(false);
  const { t, i18n } = useTranslation();

  const [selectedRow, setSelectedRow] = useState(null);
  const [selecteRowAllData, setSelectedRowAllData] = useState(null);

  const { data, error, isLoading } = useGetAllAssignedOrdersQuery(member_id);

  console.log(data);

  const columns = [
    { field: "PICKINGROUTEID", headerName: t("Picking Route ID"), width: 180 },
    { field: "ITEMID", headerName: t("Item ID"), width: 110 },
    { field: "ITEMNAME", headerName: t("Item Name"), width: 120 },
    { field: "QTY", headerName: t("Quantity"), width: 200 },
    { field: "CUSTOMER", headerName: t("Customer"), width: 200 },
    { field: "UserFullName", headerName: t("User Name"), width: 200 },
    { field: "RouteName", headerName: t("Route Name"), width: 200 },
    { field: "PlateNo", headerName: t("Vehicle Plate No"), width: 200 },
    {
      field: "action",
      headerName: t("Action"),
      headerAlign: "center",
      align: "center",
      sortable: false,

      renderCell: (params) => (
        <div className="flex justify-center">
          <Tooltip title="View Assigend Sales Order">
            <IconButton
              onClick={() => {
                setViewSalesOrder(true);
              }}
            >
              <IoEye className="text-black text-xl" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Delete Sales Order")}>
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

  const rows =
    data && data.error !== "No assigned orders found"
      ? data.map((item, index) => ({
          id: item?.id,
          PICKINGROUTEID: item?.pickingRouteId,
          ITEMID: item?.itemId,
          ITEMNAME: item?.itemName,
          QTY: item?.qty,
          CUSTOMER: item?.customer,
          UserFullName: item?.userAssignment?.user?.name,
          RouteName: item?.userAssignment?.route?.route_name,
          PlateNo: item?.userAssignment?.vehicle?.plate_number,
          // ... rest of your fields
        }))
      : [];

  const handleSelectedRow = (row) => {
    setSelectedRow(row);
    const selectedRowData = data?.find((item) => item.id === row?.id);
    setSelectedRowAllData(selectedRowData);
  };
  console.log(selecteRowAllData);
  return (
    <section className="p-5">
      <h1
        className={`text-2xl ${
          i18n.language == "ar" ? "text-end" : "text-start"
        }`}
      >
        {t("Sales Orders Details")}
      </h1>

      <div
        className={` flex ${
          i18n.language == "ar" ? "justify-end" : "justify-start"
        }`}
      >
        <div className="relative max-w-xs  mt-10 w-full">
          <input
            className={`w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500text-2xl ${
              i18n.language == "ar" ? "text-end" : "text-start"
            }`}
            type="search"
            placeholder={t("Search Sales Order")}
          />
          <button
            className={`absolute inset-y-0  flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              i18n.language == "ar" ? "left-0" : "right-0"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`py-3 mt-8 text-white px-4 bg-[#1E3B8B] rounded-md ${
          i18n.language == "ar" ? "text-end" : "text-start"
        }`}
      >
        {t("List Of Sales Order")}
      </div>

      <DataGrid
        rows={rows}
        // columns={columns}
        columns={i18n.language === "ar" ? columns.reverse() : columns}
        onRowClick={(params) => {
          handleSelectedRow(params.row);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        className="!w-full !h-full !mt-10 !border-2 !text-center"
        sx={{
          "&.MuiDataGrid-root .MuiIconButton-root": {
            // color: "white !important",
          },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        loading={isLoading}
      />

      {/* dialogs */}
      <DeleteAssignedSalesOrderDialog
        open={openDeleteUser}
        onClose={() => setOpenDeleteUser(false)}
        seletecRowId={selectedRow?.id}
      />

      {selecteRowAllData && (
        <ViewSalesOrderDrawer
          open={viewSalesOrder}
          onClose={() => setViewSalesOrder(false)}
          data={selecteRowAllData ? selecteRowAllData : {}}
        />
      )}
    </section>
  );
}

export default SalesOrderDetials;
