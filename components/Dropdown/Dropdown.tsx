"use client"

import { useState } from "react";
import type { SearchParams } from "@/types/params";

interface DropdownProps {
  id: keyof SearchParams;
  label: string;
  currentValue?: string;
  options: string[];
  onSetParam: (key: keyof SearchParams, value: string) => void;
  defaultButtonText: string;
};

export default function Dropdown({ id, label, currentValue, options, onSetParam, defaultButtonText }: DropdownProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onClick = () => {
    setIsButtonClicked(!isButtonClicked);
  }

  const optionSet = (option: string, id: keyof SearchParams) => {
    setIsButtonClicked(!isButtonClicked);
    onSetParam(id, option);
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <button id={id} onClick={onClick}>{currentValue ?? defaultButtonText}</button>
        {isButtonClicked ? options.map((option) => (
          <button type="button" key={option} value={option} onClick={() => optionSet(option, id)}>
            {option}
          </button>
        )) : false}
    </div>
  );
}