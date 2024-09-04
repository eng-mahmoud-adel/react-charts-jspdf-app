import { useRef } from "react";
import "./App.css";
import BaseBarChart from "./components/charts/BarChart";
import BaseLineChart from "./components/charts/LineChart";
import BasePieChart from "./components/charts/PieChart";
import { exportPDF } from "./utils/exportToPDF";
import {
  clicksImpressionslineChartData,
  devicesPieChart,
  insightsData,
  usersBarChartData,
  userslineChartData,
  usersMediumBarChartData,
  usersTopTenCountriesBarChartData,
} from "./data/data";
import InsightsCard from "./components/cards/InsightsCard";

function App() {
  const chartsContainerRef = useRef(null);

  return (
    <div className="App">
      {/* Insights Cards */}
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-6 py-6 justify-items-center">
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

      <div
        ref={chartsContainerRef}
        className="flex flex-col lg:flex-row gap-6 py-6"
      >
        <div className="w-full lg:w-3/4 grid lg:grid-cols-2 gap-6">
          {/* left side */}
          <div className="flex flex-col gap-6">
            <div className="chart-container h-72">
              <BaseLineChart
                data={userslineChartData}
                rotateXAxisContent={false}
              />
            </div>

            <div className="chart-container h-72">
              <BaseLineChart
                data={clicksImpressionslineChartData}
                rotateXAxisContent={true}
              />
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col gap-6">
            <div className="chart-container h-72">
              <BaseLineChart
                data={clicksImpressionslineChartData}
                rotateXAxisContent={true}
              />
            </div>

            <div className="flex gap-4">
              <div className="chart-container h-96 grow">
                <BaseBarChart
                  data={usersMediumBarChartData}
                  barColor="#18d52bde"
                  ticks={[0, 50000]}
                  barSize={20}
                  showCartesianGrid={false}
                  isVerticalChart={true}
                />
              </div>

              <div className="chart-container h-96 grow">
                <BaseBarChart
                  data={usersBarChartData}
                  barColor="#ff5594"
                  ticks={[0, 5000, 10000, 15000, 20000]}
                  barSize={80}
                  showCartesianGrid={true}
                  isVerticalChart={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="chart-container h-[30rem]">
            <BaseBarChart
              data={usersTopTenCountriesBarChartData}
              barColor="#07a7a7"
              ticks={[0, 50000, 100000, 150000]}
              barSize={20}
              showCartesianGrid={false}
              isVerticalChart={true}
              isCustomTick={true}
            />
          </div>
          <div className="chart-container !bg-transparent h-[30rem]">
            <BasePieChart
              data={devicesPieChart}
              // barColor="#07a7a7"
              // ticks={[0, 50000, 100000, 150000]}
              // barSize={20}
            />
          </div>
        </div>
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
