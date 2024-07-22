import React, { useState } from "react";
import { Images } from "../assets/Index";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavLinks() {
  const [openLink, setOpenLink] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // const NavLinks = [
  //   {
  //     title: t("Dashboard"),
  //     icon: Images.Dashboard,
  //     link: "/proutes/dashboard",
  //   },
  //   {
  //     title: t("Sales Order"),
  //     icon: Images.SalesOrder,
  //     sublinks: [
  //       {
  //         title: t("List of Sales Order from ERP"),
  //         link: "/proutes/sales-order/list-of-sales-order-from-erp",
  //       },
  //       {
  //         title: t("Sales Order Detials"),
  //         link: "/proutes/sales-order/sales-order-details",
  //       },
  //     ],
  //   },
  //   {
  //     title: t("Route Master"),
  //     icon: Images.routeMaster,
  //     sublinks: [
  //       { title: t("Plan Routes"), link: "/proutes/route-master/plan-routes" },
  //       { title: t("Routes Map"), link: "/proutes/route-master/routes-map" },
  //       {
  //         title: t("Dispatch Routes"),
  //         link: "/proutes/route-master/dispatch-routes",
  //       },
  //     ],
  //   },
  //   {
  //     title: t("Manage Territory"),
  //     icon: Images.manageTerritory,
  //     sublinks: [
  //       {
  //         title: t("Plan and Route Territories"),
  //         link: "/proutes/manage-territory/plan-and-route-territories",
  //       },
  //       {
  //         title: t("Orders by Territory"),
  //         link: "/proutes/manage-territory/orders-by-territory",
  //       },
  //     ],
  //   },
  //   {
  //     title: t("Manage Delivery"),
  //     icon: Images.manageDelivery,
  //     sublinks: [
  //       {
  //         title: t("List of Orders"),
  //         link: "/proutes/manage-delivery/list-of-orders",
  //       },
  //       {
  //         title: t("Manual Order Creation"),
  //         link: "/proutes/manage-delivery/manual-order-creation",
  //       },
  //       {
  //         title: t("Load and Unload orders"),
  //         link: "/proutes/manage-delivery/load-and-unload-orders",
  //       },
  //     ],
  //   },
  //   {
  //     title: t("Manage Driver"),
  //     icon: Images.manageDriver,
  //     sublinks: [
  //       { title: t("Add Driver"), link: "/proutes/manage-driver/add-driver" },
  //       {
  //         title: t("Update Driver"),
  //         link: "/proutes/manage-driver/update-driver",
  //       },
  //     ],
  //   },
  //   {
  //     title: t("Manage Vehicles"),
  //     icon: Images.manageVehicles,
  //     sublinks: [
  //       { title: "Add User", link: "/proutes/user-management/add-user" },
  //       { title: "User Setup", link: "/proutes/user-management/user-setup" },
  //     ],
  //     // link: "/proutes/user-management",
  //   },
  //   {
  //     title: t("User Managment"),
  //     icon: Images.userManagment,
  //     sublinks: [
  //       { title: t("Add User"), link: "/proutes/user-management/add-user" },
  //       { title: t("Update User"), link: "/proutes/user-management/update-user" },
  //     ],
  //   },
  //   {
  //     title: t("Notification"),
  //     icon: Images.notification,
  //     sublinks: [
  //       {
  //         title: t("Route Notifications"),
  //         link: "/proutes/notification/route-notification",
  //       },
  //       {
  //         title: t("Completed Notifications"),
  //         link: "/proutes/notification/complete-notification",
  //       },
  //       {
  //         title: t("Customer Notifications"),
  //         link: "/proutes/notification/customer-notification",
  //       },
  //       {
  //         title: t("Geofence Notifications"),
  //         link: "/proutes/notification/geofence-notification",
  //       },
  //       {
  //         title: t("Dispatch Notifications"),
  //         link: "/proutes/notification/dispatch-notification",
  //       },
  //       { title: t("History"), link: "/proutes/notification/history" },
  //     ],
  //   },
  //   {
  //     title: t("Settings"),
  //     icon: Images.settings,
  //     link: "/proutes/settings",
  //   },
  // ];

  const NavLinks = [
    {
      title: t("Dashboard"),
      icon: Images.Dashboard,
      link: "/",
    },
    {
      title: t("Sales Order"),
      icon: Images.SalesOrder,
      sublinks: [
        {
          title: t("List of Sales Order from ERP"),
          link: "/sales-order/list-of-sales-order-from-erp",
        },
        {
          title: t("Sales Order Details"),
          link: "/sales-order/sales-order-details",
        },
      ],
    },
    {
      title: t("Route Master"),
      icon: Images.routeMaster,
      sublinks: [
        { title: t("Plan Routes"), link: "/route-master/plan-routes" },
        { title: t("Routes Map"), link: "/route-master/routes-map" },
        {
          title: t("Dispatch Routes"),
          link: "/route-master/dispatch-routes",
        },
      ],
    },
    {
      title: t("Manage Territory"),
      icon: Images.manageTerritory,
      sublinks: [
        {
          title: t("Plan and Route Territories"),
          link: "/manage-territory/plan-and-route-territories",
        },
        {
          title: t("Orders by Territory"),
          link: "/manage-territory/orders-by-territory",
        },
      ],
    },
    {
      title: t("Manage Delivery"),
      icon: Images.manageDelivery,
      sublinks: [
        {
          title: t("List of Orders"),
          link: "/manage-delivery/list-of-orders",
        },
        {
          title: t("Manual Order Creation"),
          link: "/manage-delivery/manual-order-creation",
        },
        {
          title: t("Load and Unload orders"),
          link: "/manage-delivery/load-and-unload-orders",
        },
      ],
    },
    {
      title: t("Manage Driver"),
      icon: Images.manageDriver,
      sublinks: [
        { title: t("Add Driver"), link: "/manage-driver/add-driver" },
        {
          title: t("Update Driver"),
          link: "/manage-driver/update-driver",
        },
      ],
    },
    {
      title: t("Manage Vehicles"),
      icon: Images.manageVehicles,
      link: "/manage-vehicles",
      // sublinks: [
      //   { title: "Add Vehicle", link: "/proutes/manage-vehicles/add-vehicle" },
      //   {
      //     title: "Update Vehicle",
      //     link: "/proutes/manage-vehicles/update-vehicle",
      //   },
      //   {
      //     title: "Remove Vehicle",
      //     link: "/proutes/manage-vehicles/remove-vehicle",
      //   },
      // ],
    },

    //add transction history
    {
      title: t("Transaction History"),
      icon: Images.TransctionHistory,
      link: "/transaction-history",
    },
    {
      title: t("User Managment"),
      icon: Images.userManagment,
      sublinks: [
        { title: t("Add User"), link: "/user-management/add-user" },
        { title: t("Setup User"), link: "/user-management/user-setup" },
      ],
    },
    {
      title: t("Notification"),
      icon: Images.notification,
      sublinks: [
        {
          title: t("Route Notifications"),
          link: "/notification/route-notification",
        },
        {
          title: t("Completed Notifications"),
          link: "/notification/complete-notification",
        },
        {
          title: t("Customer Notifications"),
          link: "/notification/customer-notification",
        },
        {
          title: t("Geofence Notifications"),
          link: "/notification/geofence-notification",
        },
        {
          title: t("Dispatch Notifications"),
          link: "/notification/dispatch-notification",
        },
        { title: t("History"), link: "/notification/history" },
      ],
    },
    {
      title: t("Settings"),
      icon: Images.settings,
      link: "/settings",
    },
  ];

  const handleClick = (link) => {
    if (link.sublinks) {
      setOpenLink(openLink === link.title ? null : link.title);
    } else {
      navigate(link.link);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <nav className="flex-1 px-2 py-4 bg-[#D0EDF3]">
        <span className="w-full sm:w-auto "></span>
        {NavLinks.map((link, index) => (
          <div key={index}>
            <button
              className="flex w-full items-center justify-between px-4 py-2 rounded-md gap-3 hover:bg-white hover:text-gray-900"
              style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
              onClick={() => handleClick(link)}
            >
              <div className="flex  items-center gap-1">
                <img
                  src={link.icon}
                  alt="logo"
                  className=" w-10 h-10 object-contain"
                />
                {link.title}
              </div>
              {link.sublinks &&
                (openLink === link.title ? (
                  <AiOutlineCaretUp />
                ) : (
                  <AiOutlineCaretDown />
                ))}
            </button>
            {link.sublinks && openLink === link.title && (
              <div className="pl-5 space-y-2 py-2 ">
                {link.sublinks.map((sublink) => (
                  <button
                    onClick={() => navigate(sublink.link)}
                    key={sublink}
                    className={`block py-2 w-full rounded-md hover:bg-white hover:text-gray-900
                    ${
                      i18n.language == "ar"
                        ? "pr-2 text-end"
                        : "pl-2 text-start"
                    }  
                    `}
                  >
                    {sublink.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default NavLinks;
