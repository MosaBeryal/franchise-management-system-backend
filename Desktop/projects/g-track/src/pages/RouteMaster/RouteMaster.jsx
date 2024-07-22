import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Outlet } from "react-router-dom";

function RouteMaster() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default RouteMaster;
