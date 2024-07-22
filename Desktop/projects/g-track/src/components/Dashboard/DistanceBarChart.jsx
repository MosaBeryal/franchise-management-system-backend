import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTranslation } from "react-i18next";

const plannedData = [40, 30, 20, 27.8, 18.9, 23.9, 34.9];
const actualData = [24, 13.98, 98, 39.08, 48, 38, 43];
const xLabels = [
  "Distance A",
  "Distance B",
  "Distance C",
  "Distance D",
  "Distance E",
  "Distance F",
  "Distance G",
];

export default function DistanceBarChart() {
  
  const { t, i18n } = useTranslation();
  return (
    <BarChart
      width={500}
      height={300}
      colors={["#538dd5", "#f79646"]}
      series={[
        { data: plannedData, label: t("Planned Distance (miles)"), id: "plannedId" },
        { data: actualData, label: t("Actual Distance (miles)"), id: "actualId" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}