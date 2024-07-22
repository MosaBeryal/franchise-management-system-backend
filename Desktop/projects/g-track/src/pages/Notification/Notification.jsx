import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Outlet } from "react-router-dom";

function Notification() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default Notification;
