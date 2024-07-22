import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Button, IconButton, LinearProgress } from "@mui/material";
import PickListModel from "../../components/SalesOrder/ListOfSOERP/PickListModel";
import ShowMessage from "../../components/ShowMessage/ShowMessage";
import axios from "axios";
import { useTranslation } from "react-i18next";


const columns = (t) => [
  { field: "pickingRouteId", headerName: t("Picking Route ID"), width: 150 },
  { field: "customer", headerName: t("Customer"), width: 150 },
  {
    field: "inventoryLocationId",
    headerName: t("Inventory Location ID"),
    width: 180,
  },
  {
    field: "transactionReferenceId",
    headerName: t("Transaction Reference ID"),
    width: 200,
  },
  { field: "itemId", headerName: t("Item ID"), width: 100 },
  { field: "quantity", headerName: t("Quantity"), width: 100 },
  { field: "expeditionStatus", headerName: t("Expedition Status"), width: 150 },
  { field: "configId", headerName: t("Config ID"), width: 100 },
  { field: "wmsLocationId", headerName: t("WMS Location ID"), width: 150 },
  { field: "itemName", headerName: t("Item Name"), width: 150 },
  {
    field: "action",
    headerName: t("Action"),
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div className="flex justify-center">
        <IconButton
          onClick={() => {
            console.log("View", params.row.id);
          }}
        >
          <IoEye className="text-black text-xl" />
        </IconButton>
        <IconButton
          onClick={() => {
            console.log("Edit", params.row.id);
          }}
        >
          <CiEdit className="text-black text-xl" />
        </IconButton>
        <IconButton
          onClick={() => {
            console.log("Delete", params.row.id);
          }}
        >
          <MdDelete className="text-black text-xl" />
        </IconButton>
      </div>
    ),
  },
];

function ListSalesErp() {
  const [openPickList, setOpenPickList] = useState(false);
  const [selectedRows, setSelectedRows] = useState(null);
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { t, i18n } = useTranslation();

  // api call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://gs1ksa.org:7000/api/getAllTblSalesOrderFromErp"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform the API response to match the DataGrid's expected row format
  const rows =
    data?.map((order, index) => ({
      id: index, // Assuming the response doesn't have a unique ID, use the index as a fallback
      pickingRouteId: order.PICKINGROUTEID,
      customer: order.CUSTOMER,
      inventoryLocationId: order.INVENTLOCATIONID,
      transactionReferenceId: order.TRANSREFID,
      itemId: order.ITEMID,
      quantity: order.QTY,
      expeditionStatus:
      order.EXPEDITIONSTATUS,
      configId: order.CONFIGID,
      wmsLocationId: order.WMSLOCATIONID,
      itemName: order.ITEMNAME,
    })) || [];

  const handlePickListClick = () => {
    if (selectedRows) {
      setOpenPickList(true);
    } else {
      setShowError(true);
    }
  };

  // const selectedRowsData = selectedRows.map((id) =>
  //   rows.find((row) => row.id === id)
  // );
  // console.log(selectedRowsData);

  return (
    <section className="p-5">
      <h1
        className={`text-2xl ${
          i18n.language == "ar" ? "text-end" : "text-start"
        }`}
      >
        {t("List Of Sales Order From ERP")}
      </h1>

      <div className="relative max-w-xs  mt-10">
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

      <div
        className={`py-3 mt-8 text-white px-4 bg-[#1E3B8B] rounded-md ${
          i18n.language == "ar" ? "text-end" : "text-start"
        }`}
      >
        {t("List Of Sales Order From ERP")}
      </div>

      <div className="flex justify-end items-center px-4 mt-10">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePickListClick}
        >
          {t("PickList")}
        </Button>
      </div>

      <DataGrid
        rows={rows}
        columns={columns(t)}
        // onRowSelectionModelChange={(newRowSelectionModel) => {
        //   setSelectedRows(newRowSelectionModel);
        // }}
        onRowClick={(params) => {
          setSelectedRows(params.row);
        }}
        // rowSelectionModel={selectedRows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection

        // disableRowSelectionOnClick
        rowSelection
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
      <PickListModel
        open={openPickList}
        onClose={() => setOpenPickList(false)}
        selectedRows={selectedRows}
      />

      {/* error message */}
      {showError && (
        <ShowMessage
          message={t("Please select a sales order row before opening the pick list.")}
          severity="error"
          open={showError}
          handleClose={() => setShowError(false)}
        />
      )}
    </section>
  );
}

export default ListSalesErp;
