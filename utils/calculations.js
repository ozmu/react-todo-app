export const calculatePercentage = (value, total) => {
    return value === 0 ? 0 : (value / total) * 100;
}