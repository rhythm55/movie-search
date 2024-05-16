export const generateArray = (length: number, increment = 1): number[] =>
  Array.from({ length }, (_, index) => index + increment);
