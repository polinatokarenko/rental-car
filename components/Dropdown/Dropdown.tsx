"use client"

import css from "./Dropdown.module.css";
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
    <div className={css.dropdownContainer}>
      <div className={css.labelDropdownContainer}>
        <label className={css.dropdownLabel} htmlFor={id}>{label}</label>
        <button className={css.mainButton} id={id} onClick={onClick}>
          {currentValue ?? defaultButtonText}
          {isButtonClicked
          ?
          <svg width={13} height={7} fill="var(--main)">
            <use href="/icons/sprite.svg#icon-arrow-up"></use>
          </svg>
          :
          <svg width={13} height={7} fill="var(--main)">
            <use href="/icons/sprite.svg#icon-arrow-down"></use>
          </svg>}
        </button>
      </div>
      {isButtonClicked ? (
        <div className={css.optionsListContainer}>
          {options.map((option) => (
          <button className={css.optionButton} type="button" key={option} value={option} onClick={() => optionSet(option, id)}>
            {option}
          </button>
          ))}
        </div>
      ) : false}
    </div>
  );
}