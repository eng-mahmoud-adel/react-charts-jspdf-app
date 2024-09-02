import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { formatMoney } from "../../utils/formatNumbers";

interface IInsightsCard {
    label: string;
    value: number;
    trend: number;
}

const InsightsCard = ({ label, value, trend }: IInsightsCard) => {
    return (
        <div className="text-white">
            <h1 className="text-xl">{label}</h1>
            <p className="text-3xl">{label === "CTR" ? `${value}%` : formatMoney(value)}</p>
            <p className="flex items-end gap-1">
                {trend > 0 ? <span><FaLongArrowAltUp fill="green" /></span> : <span><FaLongArrowAltDown fill="red" /></span>}
                <span className={`${trend > 0 ? "text-green-700" : "text-red-700"}`}>{trend}</span>
            </p>
        </div>
    )
}

export default InsightsCard