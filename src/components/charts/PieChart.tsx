import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface ILabelPosition {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}

interface IBasePieChart<T> {
  data: T[];
  colors: string[]
}


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: ILabelPosition) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${value.toFixed(0)}%`}
    </text>
  );
};

const BasePieChart = <T,>({ data, colors }: IBasePieChart<T>) => {

  const customLegendFormatter = (value: string, entry: any) => {
    const { payload } = entry;
    return payload.label;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="40%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
          innerRadius={75}
          fill="#8884d8"
          dataKey="value"
          className="outline-none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend iconType="circle" verticalAlign="top" formatter={customLegendFormatter} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BasePieChart;
