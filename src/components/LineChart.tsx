import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { lineChartData } from '../data/data';
import { Label } from '../enums/label.enum';
import { IChartData } from '../App';
import { useState } from 'react';

interface IBaseLineChart {
    handleChartClick: (label: string, data: IChartData) => void;
}

const BaseLineChart = ({ handleChartClick }: IBaseLineChart) => {
    const [selectedPoint, setSelectedPoint] = useState("");

    const CustomizedDot = (props: any) => {
        const { cx, cy, payload } = props;
        const isSelected = selectedPoint === payload.year;

        return (
            <Dot
                cx={cx}
                cy={cy}
                r={5}
                stroke={isSelected ? 'red' : '#8884d8'}
                fill={isSelected ? 'red' : '#fff'}
            />
        );
    };

    return (
        <ResponsiveContainer width="100%" height="90%">
            <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                onClick={(props) => {
                    handleChartClick(Label.INCOME, props.activePayload?.[0].payload)
                    setSelectedPoint(props.activePayload?.[0].payload.year);
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 5 }} dot={<CustomizedDot />} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default BaseLineChart