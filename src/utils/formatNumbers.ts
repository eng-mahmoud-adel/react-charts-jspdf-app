export const formatMoney = (value: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    });

    return formatter.format(value);
};
