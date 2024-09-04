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
}

const COLORS = ["#ff5594", "#07a7a7", "#84379b"];

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
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${value.toFixed(0)}%`}
    </text>
  );
};

const BasePieChart = <T,>({ data }: IBasePieChart<T>) => {
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
          onClick={(props) => {}}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconType="circle" verticalAlign="top" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BasePieChart;
