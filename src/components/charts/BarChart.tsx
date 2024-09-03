import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Label } from "../../enums/label.enum";

interface IEntry {
  id: number;
  label: string;
  value: number;
}

interface IBaseBarChart<T extends IEntry> {
  data: T[];
  showCartesianGrid: boolean;
  showYAxis?: boolean;
  isVerticalChart: boolean;
}
const BaseBarChart = <T extends IEntry>({
  data,
  showCartesianGrid,
  showYAxis,
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
          right: 20,
          left: 0,
          bottom: 50,
        }}
        barSize={20}
        onClick={(props) => {
          setSelectedPoint(props.activePayload?.[0].payload.label);
        }}
      >
        {showCartesianGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
        {isVerticalChart ? (
          <XAxis dataKey="label" />
        ) : (
          <YAxis dataKey="label" />
        )}
        {showYAxis ? isVerticalChart ? <YAxis /> : <XAxis /> : null}
        {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={selectedPoint === entry.label ? "red" : "#8884d8"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BaseBarChart;
