import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// sales Order
import SalesOrder from "../pages/SalesOrder/SalesOrder";
import ListSalesErp from "../pages/SalesOrder/ListSalesErp";
import SalesOrderDetails from "../pages/SalesOrder/SalesOrderDetails";

// Route Master
import RouteMaster from "../pages/RouteMaster/RouteMaster";
import PlanRoutes from "../pages/RouteMaster/PlanRoutes";
import RouteMap from "../pages/RouteMaster/RouteMap";
import DispatchRoutes from "../pages/RouteMaster/DispatchRoutes";

// Manage Territory
import ManageTerritory from "../pages/ManageTerritory/ManageTerritory";
import PlanAndRouteTerritories from "../pages/ManageTerritory/PlanAndRouteTerritories";
import OrdersByTerritory from "../pages/ManageTerritory/OrdersByTerritory";

// Manage Delivery
import ManageDelivery from "../pages/ManageDelivery/ManageDelivery";
import ListOfOrders from "../pages/ManageDelivery/ListOfOrders";
import ManualOrderCreation from "../pages/ManageDelivery/ManualOrderCreation";
import LoadAndUnloadOrders from "../pages/ManageDelivery/LoadAndUnloadOrders";

// Manage Driver
import ManageDriver from "../pages/ManageDriver/ManageDriver";
import AddDriver from "../pages/ManageDriver/AddDriver";
import UpdateDriver from "../pages/ManageDriver/UpdateDriver";

// Manage Vehicles
import ManageVehicles from "../pages/ManageVehicles/ManageVehicles";

// User Management
import UserManagement from "../pages/UserManagment/UserManagment";
import AddUser from "../pages/UserManagment/AddUser";
import SetupUser from "../pages/UserManagment/SetupUser";

// Notification
import Notification from "../pages/Notification/Notification";
import History from "../pages/Notification/History";
import CompleteNotification from "../pages/Notification/CompleteNotification";
import RouteNotification from "../pages/Notification/RouteNotification";
import CustomerNotification from "../pages/Notification/CustomerNotification";
import GeofenceNotification from "../pages/Notification/GeofenceNotification";
import DispatchNotification from "../pages/Notification/DispatchNotification";

// setting
import Settings from "../pages/Settings";

// Transction History
import TrasncationHistory from "../pages/TransctionHistory/TransctionHistory";

const PRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sales-order" element={<SalesOrder />}>
        <Route path="list-of-sales-order-from-erp" element={<ListSalesErp />} />
        <Route path="sales-order-details" element={<SalesOrderDetails />} />
      </Route>

      <Route path="/route-master" element={<RouteMaster />}>
        <Route path="plan-routes" element={<PlanRoutes />} />
        <Route path="routes-map" element={<RouteMap />} />
        <Route path="dispatch-routes" element={<DispatchRoutes />} />
      </Route>

      <Route path="/manage-territory" element={<ManageTerritory />}>
        <Route
          path="plan-and-route-territories"
          element={<PlanAndRouteTerritories />}
        />
        <Route path="orders-by-territory" element={<OrdersByTerritory />} />
      </Route>

      <Route path="/manage-delivery" element={<ManageDelivery />}>
        <Route path="list-of-orders" element={<ListOfOrders />} />
        <Route path="manual-order-creation" element={<ManualOrderCreation />} />
        <Route
          path="load-and-unload-orders"
          element={<LoadAndUnloadOrders />}
        />
      </Route>

      <Route path="/manage-driver" element={<ManageDriver />}>
        <Route path="add-driver" element={<AddDriver />} />
        <Route path="update-driver" element={<UpdateDriver />} />
      </Route>

      <Route path="/manage-vehicles" element={<ManageVehicles />} />

      <Route path="/transaction-history" element={<TrasncationHistory />} />

      <Route path="/user-management" element={<UserManagement />}>
        <Route path="add-user" element={<AddUser />} />
        <Route path="user-setup" element={<SetupUser />} />
      </Route>

      <Route path="/notification" element={<Notification />}>
        <Route path="history" element={<History />} />
        <Route
          path="complete-notification"
          element={<CompleteNotification />}
        />
        <Route path="route-notification" element={<RouteNotification />} />
        <Route
          path="customer-notification"
          element={<CustomerNotification />}
        />
        <Route
          path="geofence-notification"
          element={<GeofenceNotification />}
        />
        <Route
          path="dispatch-notification"
          element={<DispatchNotification />}
        />
      </Route>

      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default PRoutes;
