import React from "react";
import { useTranslation } from "react-i18next";


function StatisticCards() {
  const { t, i18n } = useTranslation();
  const StatsData = [
    {
      id: 1,
      title: t("Total Routes"),
      value: 10,
      color: "#2F137C",
    },
    {
      id: 2,
      title: t("Total Stops"),
      value: 142,
      color: "#217ABA",
    },
    {
      id: 3,
      title: t("Planned Distance"),
      value: 379,
      color: "#C12611",
    },
    {
      id: 4,
      title: t("Actual Distance"),
      value: 194,
      color: "#AB3727",
    },
    {
      id: 5,
      title: t("Address Visited"),
      value: 78,
      color: "#8F682E",
    },
    {
      id: 6,
      title: t("Notes Added"),
      value: 73,
      color: "#F99907",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto  lg:py-4 ">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 mt-4">
        {StatsData.map((data) => (
          <div className=" overflow-hidden shadow sm:rounded-lg text-white "
            key={data.id}
            style={{ backgroundColor: data.color }}
          >
            <div className="px-2 py-5 sm:p-4">
              <dl>
                <dd className="mt-1 text-3xl leading-9 text-center font-semibold  ">
                    {data.value}
                </dd>
                <dt className="text-sm leading-5 text-center font-medium  truncate ">
                    {data.title}
                </dt>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticCards;
