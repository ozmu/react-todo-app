export const calculatePercentage = (value, total) => {
    return value === 0 ? 0 : parseInt((value / total) * 100);
}