import { useRef, useState } from 'react';
import './App.css';
import BaseBarChart from './components/BarChart';
import BaseLineChart from './components/LineChart';
import BasePieChart from './components/PieChart';
import { exportPDF } from './utils/exportToPDF';

export interface IChartData {
  year: string;
  value: number
}

function App() {
  const [selectedData, setSelectedData] = useState({
    income: { year: "", value: "" },
    expenses: { year: "", value: "" },
    totalPercentage: { year: "", value: "" }
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
      <div ref={chartsContainerRef} className="wrapper">
        <div className='chart-container'>
          <h2 className='font-semibold text-xl mb-8'>Income Data</h2>
          <BaseLineChart handleChartClick={handleChartClick} />
        </div>

        <div className='chart-container'>
          <h2 className='font-semibold text-xl mb-8'>Expenses Data</h2>
          <BaseBarChart handleChartClick={handleChartClick} />
        </div>

        <div className='chart-container'>
          <h2 className='font-semibold text-xl mb-8'>Total percentage data (income / expenses)</h2>
          <BasePieChart handleChartClick={handleChartClick} />
        </div>
      </div>

      <button
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
      )}
    </div>
  );
}

export default App;
