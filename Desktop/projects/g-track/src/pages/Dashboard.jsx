import React, { useState } from "react";
// styling
import { IoDownloadOutline } from "react-icons/io5";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineStarOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
// components
import MainLayout from "../layout/MainLayout";
import MemberFilter from "../components/Dashboard/MemberFilter";
import StatisticCards from "../components/Dashboard/StatisticCards";
import DistanceBarChart from "../components/Dashboard/DistanceBarChart";
import VisiterPieChart from "../components/Dashboard/VisitedPieChart";
import BasicDatePicker from "../components/Dashboard/DatePicker";
import GroupFilter from "../components/Dashboard/GroupFilter";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const [totalFilterOpen, setTotalFilterOpen] = useState(false);
  const [graphFilterOpen, setGraphFilterOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <MainLayout>
      <section>
        <div  className={`flex justify-between mt-5  ${i18n.language =='ar' ? 'flex-row-reverse' : 'flex-row'}`}
>
          <h1 className="font-semibold text-2xl">{t("Dashboard")}</h1>
          <button className="py-1 px-2 shadow-md flex gap-2 bg-[#D0EDF3] ">
            <IoDownloadOutline className="text-xl" />
            <span>{t("EXPORT AS CSV")}</span>
            <RiArrowDownSFill className="text-xl" />
          </button>
        </div>

        <div className={`w-full flex justify-between items-center  mt-5  ${i18n.language =='ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="max-w-sm">
            <MemberFilter />
            <div  className={`flex items-center gap-2 mt-5 w-full ${i18n.language =='ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="mt-1">
                <input
                  type="checkbox"
                  name="includeAllSubUsers"
                  id="includeAllSubUsers"
                  className="!h-5 !w-5"
                />
              </span>
              <label htmlFor="includeAllSubUsers" className="flex-grow">
                {t("Include All Sub-Users in the Report")}
              </label>
            </div>
          </div>

          <div className="w-[270px]">
            <BasicDatePicker />
            <GroupFilter />
          </div>
        </div>

        <div className={`bg-[#350F9F] py-4 px-3 flex items-center justify-between rounded-md mt-4`} style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}>
          <div className="flex gap-2 items-center">
            <MdOutlineStarOutline className="text-2xl text-white" />
            <h1 className="text-white text-xl">{t("Total")}</h1>
          </div>
          <div className="relative inline-block text-left">
            <BsThreeDotsVertical
              onClick={() => setTotalFilterOpen(!totalFilterOpen)}
              className="text-white text-2xl cursor-pointer"
            />
            {totalFilterOpen && (
              <div
                className={`absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${i18n.language =='ar' ? 'left-0' : 'right-0'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div className="flex items-center  px-3 border-b mt-3">
                  <FaFilter className="text-gray-500 text-xl" />
                  <input
                    type="text"
                    placeholder={t("Filter")}
                    className="w-full border-none focus:outline-none border-gray-200 rounded-md p-1"
                  />
                </div>

                <div className="py-1 px-4" role="none">
                  {[
                    t("Total Routes"),
                    t("Total Stops"),
                    t("Planned Distance"),
                    t("Actual Distance"),
                    t("Address Visted"),
                    t("Notes Added"),
                  ].map((day) => (
                    <div>
                      <label
                        key={day}
                        className="my-2 cursor-pointer max-w-fit border-b gap-2 border-gray-100 py-1 font-semibold text-gray-500 hover:text-black  flex justify-start items-center"
                      >
                        <input
                          readOnly
                          defaultChecked
                          tabIndex="-1"
                          type="checkbox"
                          className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                        />
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <StatisticCards />
        </div>

        <div className="bg-[#3685FC] py-4 px-3 flex items-center justify-between rounded-md my-4"  style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}>
          <div className="flex gap-2 items-center">
            <IoStatsChart className="text-2xl text-white" />
            <h1 className="text-white text-xl">{t("Graph")}</h1>
          </div>
          {/* <BsThreeDotsVertical className="text-white text-2xl cursor-pointer" /> */}
          <div className="relative inline-block text-left">
            <BsThreeDotsVertical
              onClick={() => setGraphFilterOpen(!graphFilterOpen)}
              className="text-white text-2xl cursor-pointer"
            />
            {graphFilterOpen && (
              <div
                 className={`absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${i18n.language =='ar' ? 'left-0' : 'right-0'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div className="flex items-center  px-3 border-b mt-3">
                  <FaFilter className="text-gray-500 text-xl" />
                  <input
                    type="text"
                    placeholder={t("Filter")}
                    className="w-full border-none focus:outline-none border-gray-200 rounded-md p-1"
                  />
                </div>

                <div className="py-1 px-4" role="none">
                  {[
                    t("Distance (Planned vs Actual)"),
                    t("Stops (Visited vs Not Visted)"),
                    t("Time (Planned vs Actual)"),
                    t("Routes"),
                    t("Stops (Visted vs Detected)"),
                    t("Stops (Planned vs Visted)"),
                    t("Average Marked Time"),
                    t("Marked Time"),
                    t("Average Planned Service Time"),
                    t("Planned Service Time"),
                    t("Stops Geofence Enterd /Left"),
                  ].map((day) => (
                    <div>
                      <label
                        key={day}
                        className="my-2 cursor-pointer max-w-fit border-b gap-2 border-gray-100 py-1 font-semibold text-gray-500 hover:text-black  flex justify-start items-center"
                      >
                        <input
                          readOnly
                          tabIndex="-1"
                          type="checkbox"
                          className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                        />
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-5 mt-7 items-center  w-full">
          <div className="p-2 border border-yellow-500 w-1/2 rounded-md">
            <h1 className={`${i18n.language =='ar' ? 'text-end' : 'text-start'}`}>{t("Distance (Planned vs Actual)")}</h1>
            <DistanceBarChart />
          </div>

          <div className="p-2 border border-yellow-500 w-1/2 rounded-md">
            <h1 className={`${i18n.language =='ar' ? 'text-end' : 'text-start'}`}>{t("Stops (Visited vs Not-Visited)")}</h1>
            <VisiterPieChart />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Dashboard;
