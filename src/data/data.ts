// income
export const lineChartData = [
    {
        year: "2018",
        value: 1000000,
    },
    {
        year: "2019",
        value: 3000000,
    },
    {
        year: "2020",
        value: 2000000,
    },
    {
        year: "2021",
        value: 4000000,
    },
    {
        year: "2022",
        value: 6000000,
    },
    {
        year: "2023",
        value: 5000000,
    },
    {
        year: "2024",
        value: 7000000,
    },
];

// expenses
export const barChartData = [
    {
        year: "2018",
        value: 500000,
    },
    {
        year: "2019",
        value: 1000000,
    },
    {
        year: "2020",
        value: 800000,
    },
    {
        year: "2021",
        value: 2000000,
    },
    {
        year: "2022",
        value: 3000000,
    },
    {
        year: "2023",
        value: 2000000,
    },
    {
        year: "2024",
        value: 3000000,
    },
];

// (income / expenses) percentage
export const pieChartData = lineChartData.map((record, index) => {
    const barData = barChartData[index];
    const percentage = record.value / barData.value;

    const data = {
        year: record.year,
        value: percentage,
    };

    return data;
});
