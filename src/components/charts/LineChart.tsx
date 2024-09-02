import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, Dot } from 'recharts';
import { Label } from '../../enums/label.enum';
import { IChartData } from '../../App';
import { useState } from 'react';
import { formatMoney } from '../../utils/formatNumbers';

interface IBaseLineChart<T> {
    data: T[];
    showYAxis?: boolean;
    rotateXAxisContent?: boolean;
    handleChartClick: (label: string, data: IChartData) => void;
}

const BaseLineChart = <T,>({ data, showYAxis, rotateXAxisContent, handleChartClick }: IBaseLineChart<T>) => {
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

    const CustomizedTick = (props: any) => {
        const { x, y, payload, index } = props;
        const isEven = index % 2 === 0

        return (
            <text x={x} y={y + (isEven ? 0 : 15)} dy={16} textAnchor='middle' fill='#fff'>
                {payload.value}
            </text>
        )
    }

    // const renderCustomLegend = (props: any) => {
    //     const { payload } = props;

    //     return (
    //         <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
    //             {payload.map((entry: any, index: number) => (
    //                 <li key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: "6px", position: "absolute", top: 0 }}>
    //                     <svg width="25" height="25" viewBox="0 0 32 32" fill={entry.color}>
    //                         <path d="M0 16h32v1H0z" />
    //                     </svg>
    //                     <span style={{ color: '#fff' }}>{entry.value}</span>
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // };

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
                    handleChartClick(Label.INCOME, props.activePayload?.[0].payload)
                    setSelectedPoint(props.activePayload?.[0].payload.year);
                }}
            >
                <XAxis dataKey="date" tickLine={false} stroke="#fff" tickMargin={rotateXAxisContent ? 20 : 0} angle={rotateXAxisContent ? -45 : 0} tick={rotateXAxisContent ? undefined : <CustomizedTick />} />
                {showYAxis ?
                    <YAxis
                        tickLine={false}
                        // ticks={[0, 5000, 10000]}
                        tickFormatter={formatMoney}
                        tickMargin={10}
                        stroke="#fff" />
                    :
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatMoney}
                        tickMargin={10}
                        stroke="#fff"
                    />}
                <Legend verticalAlign="top" iconSize={25} iconType='plainline' />
                {/* <Legend content={renderCustomLegend} /> */}
                <Line type="monotone" dataKey="value1" stroke="#fff" activeDot={{ r: 5 }} dot={<CustomizedDot />} />
                <Line type="monotone" dataKey="value2" stroke="pink" activeDot={{ r: 5 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default BaseLineChart