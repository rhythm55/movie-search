import { generateArray } from "../../utils/commonUtils";

describe("generateArray", () => {
  it("should generate an array of numbers starting from 0 with default increment of 1", () => {
    const length = 5;
    const expectedArray = [1, 2, 3, 4, 5];
    expect(generateArray(length)).toEqual(expectedArray);
  });

  it("should generate an array of numbers starting from 1 with increment of 2", () => {
    const length = 5;
    const increment = 2;
    const expectedArray = [2, 3, 4, 5, 6];
    expect(generateArray(length, increment)).toEqual(expectedArray);
  });

  it("should generate an array of numbers starting from 10 with default increment of 1", () => {
    const length = 5;
    const expectedArray = [10, 11, 12, 13, 14];
    expect(generateArray(length, 10)).toEqual(expectedArray);
  });
});
