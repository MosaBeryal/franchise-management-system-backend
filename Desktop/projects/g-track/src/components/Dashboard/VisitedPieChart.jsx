import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTranslation } from "react-i18next";

export default function VisiterPieChart() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-between px-12 my-1 ">
        <div className="my-3">
          <h1 className="text-4xl font-semibold">142</h1>
          <p>{t('Total Stops')}</p>
        </div>

        {/* vertical divider */}
        <div className="h-16 border-l border-gray-300 border-2"></div>

        <div className="my-3">
            <h1 className="text-4xl font-semibold">42</h1>
            <p>{t("Visited Stops")}</p>
            </div>
      </div>
      <PieChart
        colors={["#217ABA", "#C24534"]}
        series={[
          {
            data: [
              { id: 0, value: 10, label: t("Visited") },
              { id: 1, value: 15, label: t("Not Visited") },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}
