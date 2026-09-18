export const accountingPeriod = (idx) => {
    const today = new Date();
    const currentFinancialYearStart = today.getMonth() >= 3
        ? parseInt(today.getFullYear())
        : parseInt(today.getFullYear()) - 1;
    const financialYearStart = currentFinancialYearStart + idx;

    return `(01/04/${financialYearStart} - 31/03/${financialYearStart + 1})`;
}
