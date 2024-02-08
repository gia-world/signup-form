export const generateDaysOption = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1940; year--) {
    yearOptions.push({ value: year, label: String(year) });
  }

  // 월 옵션 생성
  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));

  // 일 옵션 생성
  const dayOptions = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: String(index + 1),
  }));
  return { years: yearOptions, months: monthOptions, days: dayOptions };
};
