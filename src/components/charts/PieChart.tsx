
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { pieChartData } from '../../data/data';
import { Label } from '../../enums/label.enum';
import { IChartData } from '../../App';

interface ILabelPosition {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    value: number;
}

interface IBasePieChart {
    handleChartClick: (label: string, data: IChartData) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#685aa8", "#5aa88b", "#a6a85a"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: ILabelPosition) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(value * 100).toFixed(0)}%`}
        </text>
    );
};

const BasePieChart = ({ handleChartClick }: IBasePieChart) => {
    return (
        <ResponsiveContainer width="100%" height="80%">
            <PieChart width={400} height={400}>
                <Pie
                    data={[]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    className='outline-none'
                    onClick={(props) => {
                        handleChartClick(Label.TOTAL_PERCENTAGE, props.payload.payload)
                    }}
                >
                    {/* {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))} */}
                </Pie>
            </PieChart>
        </ResponsiveContainer >
    )
}

export default BasePieChart