import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Outlet } from "react-router-dom";

function UserManagment() {
  return (
    <MainLayout>
      <section className="p-2">
        <Outlet />
      </section>
    </MainLayout>
  );
}

export default UserManagment;
