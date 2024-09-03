import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { formatMoney } from "../../utils/formatNumbers";

interface IEntry {
  id: number;
  label: string;
  value: number;
}

interface IBaseBarChart<T extends IEntry> {
  data: T[];
  barColor: string;
  ticks: number[];
  barSize: number;
  showCartesianGrid: boolean;
  showYAxis?: boolean;
  isVerticalChart: boolean;
}
const BaseBarChart = <T extends IEntry>({
  data,
  barColor,
  ticks,
  barSize,
  showCartesianGrid,
  isVerticalChart,
}: IBaseBarChart<T>) => {
  const [selectedPoint, setSelectedPoint] = useState("");

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout={isVerticalChart ? "vertical" : "horizontal"}
        width={500}
        height={300}
        data={data}
        margin={{
          top: 50,
          right: isVerticalChart ? 50 : 20,
          left: isVerticalChart ? 90 : 10,
          bottom: 50,
        }}
        barSize={barSize}
        onClick={(props) => {
          setSelectedPoint(props.activePayload?.[0].payload.label);
        }}
      >
        {showCartesianGrid ? <CartesianGrid strokeDasharray="0 0" vertical={false} /> : null}
        <XAxis
          type={isVerticalChart ? 'number' : 'category'}
          dataKey={isVerticalChart ? undefined : 'label'}
          tickLine={false}
          tickFormatter={isVerticalChart ? formatMoney : undefined}
          stroke="#fff"
          axisLine={false}
          ticks={isVerticalChart ? ticks : undefined} />
        <YAxis type={isVerticalChart ? 'category' : 'number'}
          dataKey={isVerticalChart ? 'label' : undefined}
          tickLine={false}
          tickFormatter={isVerticalChart ? undefined : formatMoney}
          stroke="#fff"
          ticks={isVerticalChart ? undefined : ticks}
          axisLine={isVerticalChart ? true : false}
        />
        {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
        {/* <Legend align="left" verticalAlign="top" /> */}
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={selectedPoint === entry.label ? "red" : barColor}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BaseBarChart;
