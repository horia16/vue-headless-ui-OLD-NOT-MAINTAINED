export const months = [
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
];
export const weekdays = [
  { short: "Mo", long: "Monday" },
  { short: "Tu", long: "Tuesday" },
  { short: "We", long: "Wednesday" },
  { short: "Th", long: "Thursday" },
  { short: "Fr", long: "Friday" },
  { short: "Sa", long: "Saturday" },
  { short: "Su", long: "Sunday" }
];

export type DayMatrix = Array<
  Array<
    | {
        pos: number;
        date: Date;
        meta: { disabled: boolean; selected: boolean; inRange: boolean };
      }
    | undefined
    | null
  >
>;

/**
 * Create a 2d array with the days form a specific month of the year.
 */
export function createDayMapping(month: number, year: number) {
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
        matrix[i][j] = {
          pos: currentDay,
          date: new Date(year, monthIndex, currentDay),
          meta: {
            disabled: false,
            selected: false,
            inRange: false
          }
        };
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
export function convertToObjectDate(value: string | Date | undefined) {
  if (!value) {
    return {
      d: undefined,
      m: undefined,
      y: undefined
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

export function convertToDate(value: { d: number; m: number; y: number }, mode: "date" | "string" = "date") {
  const isoString = `${value.y}-${value.m < 10 ? `0${value.m}` : value.m}-${value.d < 10 ? `0${value.d}` : value.d}`;
  if (mode == "date") return new Date(isoString);
  return isoString;
}
