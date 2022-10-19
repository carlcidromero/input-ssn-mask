import React from "react";
import { render, screen } from "@testing-library/react";
import App, { format } from "./App";

describe("MaskedInput", () => {
  describe("format", () => {
    const cases = [
      { value: "", mask: "(###) ###-####", expected: "" },
      { value: "1", mask: "(###) ###-####", expected: "(1" },
      { value: "12", mask: "(###) ###-####", expected: "(12" },
      { value: "123", mask: "(###) ###-####", expected: "(123" },
      { value: "1234", mask: "(###) ###-####", expected: "(123) 4" },
      { value: "12345", mask: "(###) ###-####", expected: "(123) 45" },
      { value: "123456", mask: "(###) ###-####", expected: "(123) 456" },
      { value: "1234567", mask: "(###) ###-####", expected: "(123) 456-7" },
      { value: "12345678", mask: "(###) ###-####", expected: "(123) 456-78" },
      { value: "123456789", mask: "(###) ###-####", expected: "(123) 456-789" },
      {
        value: "1234567890",
        mask: "(###) ###-####",
        expected: "(123) 456-7890",
      },
      {
        value: "1234567890000",
        mask: "(###) ###-####",
        expected: "(123) 456-7890",
      },
    ];
    cases.forEach(({ value, mask, expected }, index) => {
      it(`test ${index + 1}: ${value} => ${mask}`, () => {
        expect(format(value, mask)).toBe(expected);
      });
    });
  });
});
