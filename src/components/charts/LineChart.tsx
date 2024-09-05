import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    Dot,
} from "recharts";
import { useState } from "react";
import { formatMoney } from "../../utils/formatNumbers";

interface IBaseLineChart<T> {
    data: T[];
    showYAxis?: boolean;
    rotateXAxisContent?: boolean;
    dataKeys: string[];
    legendValues: string[];
}

const BaseLineChart = <T,>({
    data,
    showYAxis,
    rotateXAxisContent,
    dataKeys,
    legendValues
}: IBaseLineChart<T>) => {
    const [selectedPoint, setSelectedPoint] = useState("");

    const CustomizedDot = (props: any) => {
        const { cx, cy, payload } = props;
        const isSelected = selectedPoint === payload.date;

        return (
            <Dot
                cx={cx}
                cy={cy}
                r={5}
                stroke={isSelected ? "red" : "#8884d8"}
                fill={isSelected ? "red" : "#fff"}
            />
        );
    };

    const CustomizedTick = (props: any) => {
        const { x, y, payload, index } = props;
        const isEven = index % 2 === 0;

        return (
            <text
                x={x}
                y={y + (isEven ? 0 : 15)}
                dy={16}
                textAnchor="middle"
                fill="#fff"
            >
                {payload.value}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%" className="relative">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 50,
                    right: 50,
                    left: 10,
                    bottom: 50,
                }}
                onClick={(props) => {
                    setSelectedPoint(props.activePayload?.[0].payload.date);
                }}
            >
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    stroke="#fff"
                    tickMargin={rotateXAxisContent ? 20 : 0}
                    angle={rotateXAxisContent ? -45 : 0}
                    tick={rotateXAxisContent ? undefined : <CustomizedTick />}
                />
                {showYAxis ? (
                    <YAxis
                        tickLine={false}
                        ticks={[0, 5000, 10000]}
                        tickFormatter={formatMoney}
                        tickMargin={10}
                        stroke="#fff"
                    />
                ) : (
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatMoney}
                        tickMargin={10}
                        stroke="#fff"
                    />
                )}
                <Legend wrapperStyle={{ marginTop: '-30px' }} verticalAlign="top" iconSize={25} iconType="plainline" formatter={(value) => {
                    if (value === dataKeys[0]) return legendValues[0];
                    if (value === dataKeys[1]) return legendValues[1];
                    return value;
                }} />
                <Line
                    type="monotone"
                    dataKey="value1"
                    stroke="#fff"
                    activeDot={{ r: 5 }}
                    dot={<CustomizedDot />}
                />
                <Line
                    type="monotone"
                    dataKey="value2"
                    stroke="pink"
                    activeDot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default BaseLineChart;
