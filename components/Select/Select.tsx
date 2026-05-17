"use client"

import { useState } from "react";
import type { SearchParams } from "@/types/params";

interface SelectProps {
  id: keyof SearchParams;
  label: string;
  options: string[];
  onSetParam: (key: keyof SearchParams, value: string) => void;
  defaultButtonText: string;
};

export default function Select({ id, label, options, onSetParam, defaultButtonText }: SelectProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [buttonText, setButtonText] = useState(defaultButtonText);

  const onClick = () => {
    setIsButtonClicked(!isButtonClicked);
  }

  const optionSet = (option: string, id: keyof SearchParams) => {
    setIsButtonClicked(!isButtonClicked);
    setButtonText(option);
    onSetParam(id, option);
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <button id={id} onClick={onClick}>{buttonText}</button>
        {isButtonClicked ? options.map((option) => (
          <button type="button" key={option} value={option} onClick={() => optionSet(option, id)}>
            {option}
          </button>
        )) : false}
    </div>
  );
}