import { useRef, useState } from "react";
import "./App.css";
import BaseBarChart from "./components/charts/BarChart";
import BaseLineChart from "./components/charts/LineChart";
import BasePieChart from "./components/charts/PieChart";
import { exportPDF } from "./utils/exportToPDF";
import {
  clicksImpressionslineChartData,
  insightsData,
  userslineChartData,
  usersMediumBarChartData,
} from "./data/data";
import InsightsCard from "./components/cards/InsightsCard";

function App() {
  const chartsContainerRef = useRef(null);

  return (
    <div className="App">
      {/* Insights Cards */}
      <div className="grid grid-cols-8 py-6 justify-items-center">
        {insightsData.map((item) => (
          <InsightsCard
            key={item.id}
            label={item.label}
            value={item.value}
            trend={item.trend}
          />
        ))}
      </div>

      <div className="border-b-4 -mx-12 border-black"></div>

      <div ref={chartsContainerRef} className="py-6">
        <div className="w-3/4 grid grid-cols-2 gap-6">
          {/* left side */}
          <div className="flex flex-col gap-6">
            <div className="chart-container h-72">
              <BaseLineChart
                data={userslineChartData}
                showYAxis={true}
                rotateXAxisContent={false}
              />
            </div>

            <div className="chart-container h-72">
              <BaseLineChart
                data={clicksImpressionslineChartData}
                showYAxis={false}
                rotateXAxisContent={true}
              />
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col gap-6">
            <div className="chart-container h-72">
              <BaseLineChart
                data={clicksImpressionslineChartData}
                showYAxis={false}
                rotateXAxisContent={true}
              />
            </div>

            <div className="flex gap-4">
              <div className="chart-container h-96 grow">
                <BaseBarChart
                  data={usersMediumBarChartData}
                  showCartesianGrid={false}
                  showYAxis={false}
                  isVerticalChart={true}
                />
              </div>

              <div className="chart-container h-96 grow">
                <BaseBarChart
                  data={usersMediumBarChartData}
                  showCartesianGrid={false}
                  showYAxis={false}
                  isVerticalChart={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/4"></div>
      </div>

      {/* <button
        className='bg-[#FF8042] text-white p-4 rounded-md font-semibold text-lg my-4'
        onClick={() => exportPDF({ chartsContainerRef, selectedData })}
      >
        Export to PDF
      </button>
 */}
    </div>
  );
}

export default App;
