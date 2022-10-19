import React, { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <MaskedInput
      onChange={handleChange}
      mask="(###) ###-####"
      value={value}
      format={format}
    />
  );
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  mask,
  value,
  onChange,
  format,
  ...otherProps
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const cleanValue = value.replace(/[^\d]/g, "");
    onChange(cleanValue);
  };

  const formatValue = (value: string, mask: string) => format(value, mask);

  return (
    <input
      value={formatValue(value, mask)}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export const format = (value: string, mask: string): string => {
  let i = 0;
  let lastReplacedIndex = -1;
  const filledMask = mask.replace(/#/g, (_, index) => {
    if (i >= value.length) return "#";
    lastReplacedIndex = index;
    return value[i++];
  });
  return filledMask.substring(0, lastReplacedIndex + 1);
};

type MaskedInputProps = Omit<React.HTMLProps<HTMLInputElement>, "onChange"> & {
  mask: string;
  value: string;
  onChange: (value: string) => void;
  format: (value: string, mask: string) => string;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default App;
