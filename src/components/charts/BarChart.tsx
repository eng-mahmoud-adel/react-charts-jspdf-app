import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
// import { barChartData } from '../../data/data';
import { Label } from '../../enums/label.enum';
import { IChartData } from '../../App';
import { useState } from 'react';

interface IBaseBarChart {
    handleChartClick: (label: string, data: IChartData) => void;
}

const BaseBarChart = ({ handleChartClick }: IBaseBarChart) => {
    const [selectedPoint, setSelectedPoint] = useState("");

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart
                width={500}
                height={300}
                data={[]}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={20}
                onClick={(props) => {
                    handleChartClick(Label.EXPENSES, props.activePayload?.[0].payload)
                    setSelectedPoint(props.activePayload?.[0].payload.year);
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value">
                    {/* {barChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={selectedPoint === entry.year ? 'red' : '#8884d8'}
                        />
                    ))} */}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BaseBarChart