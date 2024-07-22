import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { FaRoute } from "react-icons/fa6";

// api
import { useGetRouteMasterQuery } from "../../Apis/RouteMasterApis/RouteMasterApis";

import PlanNewRoute from "../../components/RouteMaster/PlanNewRoute";
import UpdateRoute from "../../components/RouteMaster/UpdateRoute";
import DeleteRoute from "../../components/RouteMaster/DeleteRoute";
import { useTranslation } from "react-i18next";

function PlanRoutes() {
  const member_id = "4103";
  const [openNewRoute, setOpenNewRoute] = useState(false);
  const [openUpdateRoute, setOpenUpdateRoute] = useState(false);
  const [openDeleteRoute, setOpenDeleteRoute] = useState(false);
  const { t, i18n } = useTranslation();

  const [selectedRow, setSelectedRow] = useState(null);
  const { data, error, isLoading } = useGetRouteMasterQuery(member_id);

  const columns = [
    {
      field: "RouteId",
      headerName: "Route ID",
      align: "center",
      headerAlign: "center",
    },
    { field: "RouteName", headerName: t("Route Name"), width: 200 },
    { field: "GLNIDNumber", headerName: t("GLN ID Number"), width: 200 },
    { field: "GPSValue", headerName: t("GPS Value"), width: 200 },
    { field: "RouteFullAddress", headerName: t("Full Address"), width: 250 },
    { field: "RouteArea", headerName: t("Area"), width: 200 },
    { field: "RouteCity", headerName: t("City"), width: 150 },
    { field: "RouteStreet", headerName: t("Street"), width: 200 },
    {
      field: "action",
      headerName: t("Action"),
      sortable: false,
      renderCell: (params) => (
        <Box>
          {/* <IconButton
            onClick={() => {
              console.log("View", params.row.RouteId);
            }}
          >
            <IoEye className="text-black text-xl" />
          </IconButton> */}
          <IconButton
            onClick={() => {
              setOpenUpdateRoute(true);
            }}
          >
            <MdEdit className="text-black text-xl" />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenDeleteRoute(true);
            }}
          >
            <AiFillDelete className="text-black text-xl" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = data
    ? data?.map((route) => ({
        id: route.id,
        RouteId: route.id,
        RouteName: route.route_name,
        GLNIDNumber: route.gln_id_number,
        GPSValue: route.Latitude + " , " + route.Longitude,
        RouteFullAddress: route.route_full_address,
        RouteArea: route.route_area,
        RouteCity: route.route_city,
        RouteStreet: route.route_street,
      }))
    : [];

  return (
    <section className="p-5">
      <div className={`flex gap-2 items-center  ${i18n.language==='ar'? 'justify-end' : 'justify-start'}`}>
        <h1 className="text-2xl">{t("Plan Routes")}</h1>
        <FaRoute className=" text-xl" />
      </div>

      <div className="flex justify-end  my-10">
        <button
          onClick={() => setOpenNewRoute(true)}
          className="bg-[#1E3B8B] px-4 py-3 text-white rounded-md "
        >
          <h1>{t("Plan New Route")}</h1>
        </button>
      </div>

      <DataGrid
        rows={rows}
        // columns={columns}
        columns={i18n.language === "ar" ? columns.reverse() : columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowClick={(row) => {
          setSelectedRow(row.row);
        }}
        // checkboxSelection
        disableRowSelectionOnClick
        className="!w-full !h-full !mt-10 !border-2"
      />

      <PlanNewRoute
        open={openNewRoute}
        onClose={() => setOpenNewRoute(false)}
      />

      <UpdateRoute
        open={openUpdateRoute}
        onClose={() => setOpenUpdateRoute(false)}
        selectedRow={selectedRow}
      />

      <DeleteRoute
        open={openDeleteRoute}
        onClose={() => setOpenDeleteRoute(false)}
        seletecRowId={selectedRow?.RouteId}
      />
    </section>
  );
}

export default PlanRoutes;
