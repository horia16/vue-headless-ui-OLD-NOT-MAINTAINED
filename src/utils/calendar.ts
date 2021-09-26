export const monthNames = {
  data: [
    { short: "Jan", long: "January" },
    { short: "Feb", long: "February" },
    { short: "Mar", long: "March" },
    { short: "Apr", long: "April" },
    { short: "May", long: "May" },
    { short: "Jun", long: "June" },
    { short: "Jul", long: "July" },
    { short: "Aug", long: "August" },
    { short: "Sep", long: "September" },
    { short: "Oct", long: "October" },
    { short: "Nov", long: "November" },
    { short: "Dec", long: "December" }
  ],
  get(month: number) {
    return this.data[month - 1];
  }
};

export const weekdayNames = [
  { short: "Mo", medium: "Mon", long: "Monday" },
  { short: "Tu", medium: "Tue", long: "Tuesday" },
  { short: "We", medium: "Wed", long: "Wednesday" },
  { short: "Th", medium: "Thu", long: "Thursday" },
  { short: "Fr", medium: "Fri", long: "Friday" },
  { short: "Sa", medium: "Sat", long: "Saturday" },
  { short: "Su", medium: "Sun", long: "Sunday" }
];

export interface DayObject {
  number: number;
  date: Date;
  disabled: boolean;
  meta: Record<string, any>;
}

export interface CalendarModifiers {
  disablePastDates: boolean;
  disableFutureDates: boolean;
  disabledDates: Array<Date | string>;
  custom: Array<(dayObject: DayObject) => DayObject>;
}

export type DayMatrix = Array<Array<DayObject | undefined | null>>;

export interface DateObject {
  d: number | null;
  m: number;
  y: number;
}

export function compareDate(
  date: Date | string | null | undefined,
  now: Date | string | null | undefined,
  comparator: "future" | "past" | "equal"
) {
  if (!date || !now) return false;
  const d =
    typeof date === "string" ? new Date(date).setHours(0, 0, 0, 0) : new Date(date.getTime()).setHours(0, 0, 0, 0);
  const n = typeof now === "string" ? new Date(now).setHours(0, 0, 0, 0) : new Date(now.getTime()).setHours(0, 0, 0, 0);
  return comparator === "past" ? d < n : comparator === "future" ? d > n : d == n;
}

export function computeDay(dayObject: DayObject, modifiers: CalendarModifiers | null = null) {
  let day = { ...dayObject };

  if (modifiers) {
    if (modifiers.disablePastDates && compareDate(day.date, new Date(), "past")) {
      day.disabled = true;
    }
    if (modifiers.disableFutureDates && compareDate(day.date, new Date(), "future")) {
      day.disabled = true;
    }
    for (let i = 0; i < modifiers.disabledDates.length; i++) {
      if (compareDate(day.date, modifiers.disabledDates[i], "equal")) {
        day.disabled = true;
        break;
      }
    }
    for (let i = 0; i < modifiers.custom.length; i++) {
      day = modifiers.custom[i](day);
    }
  }
  return day;
}

/**
 * Create a 2d array with the days form a specific month of the year.
 */
export function createDayMapping(month: number, year: number, modifiers: CalendarModifiers | null = null) {
  // Js months always start with 0;
  const monthIndex = month - 1;
  const extremes = {
    fist: new Date(year, monthIndex, 1),
    last: new Date(year, monthIndex + 1, 0)
  };
  let startOffset = extremes.fist.getDay();
  const matrixDimensions = {
    rows: startOffset >= 5 ? 6 : 5, // If our offset start's on the fifth day of the week we'll need an extra row
    columns: 7 // Always 7 days a week
  };
  // Make an empty matrix
  const matrix: DayMatrix = new Array(matrixDimensions.rows);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(matrixDimensions.columns);
  }
  // Start day of the month
  let currentDay = 1;
  // Loop through the matrix
  for (let i = 0; i < matrixDimensions.rows; i++) {
    for (let j = 0; j < matrixDimensions.columns; j++) {
      // If our day does not start on Sunday
      if (startOffset > 0) {
        // Skip this column
        startOffset--;
      } else {
        matrix[i][j] = computeDay(
          {
            number: currentDay,
            date: new Date(year, monthIndex, currentDay),
            disabled: false,
            meta: {}
          },
          modifiers
        );
        // If our current day is the last of the month break the loop
        if (currentDay == extremes.last.getDate()) {
          break;
        }
        currentDay++;
      }
    }
  }
  return matrix;
}

/**
 * Shift a matrix by one week day. Useful when we want out week to start with Monday instead of Sunday.
 * @param matrix
 */
export function shiftMatrix(matrix: DayMatrix) {
  const fistElement = matrix[0][0];
  let shifted: DayMatrix | null;
  // If we don't have an offset of 0 we can just assign our matrix, we need to create an empty start row otherwise
  if (!fistElement) {
    shifted = matrix;
  } else {
    shifted = [new Array(7), ...matrix];
  }
  // Shift the array
  for (let i = 0; i < shifted.length; i++) {
    const nextElement = i + 1 >= shifted.length ? undefined : shifted[i + 1][0];
    shifted[i] = shifted[i].slice(1);
    shifted[i].push(nextElement);
  }
  // Remove the last row in case it's empty
  if (!shifted[shifted.length - 1][0]) {
    shifted.pop();
  }
  return shifted;
}

/**
 * Convert an ISO string or a Date object to a plain js object.
 * @param value
 */
export function convertToDateObject(value: string | Date | undefined | null) {
  if (!value) {
    const today = new Date();
    return {
      d: today.getDate(),
      m: today.getMonth() + 1,
      y: today.getFullYear()
    };
  }
  let date: Date;
  if (typeof value === "string") {
    date = new Date(value);
  } else {
    date = value;
  }
  return {
    d: date.getDate(),
    m: date.getMonth() + 1,
    y: date.getFullYear()
  };
}

export function lastDayOfMonth(month: number, year: number) {
  const monthIndex = month - 1;
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function convertToDate(value: DateObject, mode: "date" | "string" = "date") {
  const isoString = `${value.y}-${value.m < 10 ? `0${value.m}` : value.m}-${
    value.d ? (value.d < 10 ? `0${value.d}` : value.d) : "01"
  }`;
  if (mode == "date") return new Date(isoString);
  return isoString;
}
