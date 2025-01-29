const days = ["M", "T", "W", "T", "F", "S", "S"];
const generateDatesForMonth = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.toLocaleString("en-US", { month: "long" });
  const currentDate = now.getDate();
  const currentDay = now.toLocaleString("en-US", { weekday: "long" });

  const numDaysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();

  const dates = [];
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"]; // First letter of the week days

  for (let i = 1; i <= numDaysInMonth; i++) {
    const date = new Date(currentYear, now.getMonth(), i);
    const day = weekdays[date.getDay()];
    dates.push([i.toString(), day]);
  }

  return {
    currentDate,
    currentYear,
    currentMonth,
    currentDay,
    numDaysInMonth,
    dates,
  };
};

const getbatches = (dates: Array<Array<string>>, days: Array<string>) => {
  const result: Array<Array<string>> = [];
  let week: string[] = new Array(days.length).fill("");
  let currentIndex = 0;

  for (const [date, day] of dates) {
    while (currentIndex < days.length && days[currentIndex] !== day) {
      currentIndex++;
    }

    if (currentIndex < days.length) {
      week[currentIndex] = date;
      currentIndex++;
    }

    if (currentIndex >= days.length) {
      result.push(week);
      week = new Array(days.length).fill("");
      currentIndex = 0;
    }
  }

  if (week.some(value => value !== "")) {
    result.push(week);
  }

  return result;
};

const generateDatesForSpecificMonth = (month: number, year: number) => {
  // if (!month || !year) return{
  //   month: "",
  //   year: 0,
  //   batches: [[]]
  // };
  const numDaysInMonth = new Date(year, month, 0).getDate();

  const dates = [];
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  for (let i = 1; i <= numDaysInMonth; i++) {
    const date = new Date(year, month - 1, i);
    const day = weekdays[date.getDay()];
    dates.push([i.toString(), day]);
  }
  const batches = getbatches(dates, days);

  return {
    month: new Date(year, month - 1).toLocaleString("en-US", { month: "long" }),
    year,
    batches,
  };
};
const dates = generateDatesForMonth();

const batches_info = getbatches(dates.dates, days);
const currentMonth = dates.currentMonth;
const currentYear = dates.currentYear
const currentDay = dates.currentDay;

export { batches_info, currentMonth, currentYear, currentDay, generateDatesForSpecificMonth };
