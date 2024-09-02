import { useRef, useState } from 'react';
import './App.css';
import BaseBarChart from './components/charts/BarChart';
import BaseLineChart from './components/charts/LineChart';
import BasePieChart from './components/charts/PieChart';
import { exportPDF } from './utils/exportToPDF';
import { clicksImpressionslineChartData, insightsData, userslineChartData } from './data/data';
import InsightsCard from './components/cards/InsightsCard';

export interface IChartData {
  date: string;
  value: number
}

function App() {
  const [selectedData, setSelectedData] = useState({
    income: { date: "", value: "" },
    expenses: { date: "", value: "" },
    totalPercentage: { date: "", value: "" }
  });

  const handleChartClick = (label: string, data: IChartData) => {
    setSelectedData((prevData) => {
      return {
        ...prevData,
        [label]: data
      }
    });
  };

  const chartsContainerRef = useRef(null)

  return (
    <div className="App">
      {/* Insights Cards */}
      <div className='grid grid-cols-8 py-6 justify-items-center'>
        {insightsData.map(item => <InsightsCard key={item.id} label={item.label} value={item.value} trend={item.trend} />)}
      </div>

      <div className='border-b-4 -mx-12 border-black'></div>

      <div ref={chartsContainerRef} className='py-6'>
        <div className='w-3/4 grid grid-cols-2 gap-6'>
          {/* left side */}
          <div className='flex flex-col gap-6'>
            <div className='chart-container h-72'>
              <BaseLineChart data={userslineChartData} showYAxis={true} rotateXAxisContent={false} handleChartClick={handleChartClick} />
            </div>

            <div className='chart-container h-72'>
              <BaseLineChart data={clicksImpressionslineChartData} showYAxis={false} rotateXAxisContent={true} handleChartClick={handleChartClick} />
            </div>
          </div>

          {/* right side */}
          <div className='flex flex-col gap-6'>
            <div className='chart-container h-72'>
              <BaseLineChart data={clicksImpressionslineChartData} showYAxis={false} rotateXAxisContent={true} handleChartClick={handleChartClick} />
            </div>
          </div>
        </div>

        <div className='w-1/4'></div>
      </div>

      {/* <button
        className='bg-[#FF8042] text-white p-4 rounded-md font-semibold text-lg my-4'
        onClick={() => exportPDF({ chartsContainerRef, selectedData })}
      >
        Export to PDF
      </button>

      {selectedData.income.value && (
        <p>
          Income Selected Data: <strong>{selectedData.income.year}</strong> - <strong>{selectedData.income.value}</strong>
        </p>
      )}

      {selectedData.expenses.value && (
        <p>
          Expenses Selected Data: <strong>{selectedData.expenses.year}</strong> - <strong>{selectedData.expenses.value}</strong>
        </p>
      )}

      {selectedData.totalPercentage.value && (
        <p>
          Total Percentage Selected Data: <strong>{selectedData.totalPercentage.year}</strong> - <strong>{`${(+selectedData.totalPercentage.value * 100).toFixed(0)}%`}</strong>
        </p>
      )} */}
    </div>
  );
}

export default App;
