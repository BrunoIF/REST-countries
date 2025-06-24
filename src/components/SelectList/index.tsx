import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./styles.module.scss";

interface Props {
  options: string[];
  onChange: (selectedValue: string) => void;
}

function SelectList({ options, onChange }: Props) {
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleChange = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleReset = () => {
    setIsOpen(false);
    setSelectedValue(options[0]);
    onChange("");
  };

  useEffect(() => {
    if (selectedValue !== options[0]) {
      onChange(selectedValue);
      setIsResetOpen(true);
    } else {
      setIsResetOpen(false);
    }
  }, [selectedValue]);

  return (
    <div className={s.container}>
      {isResetOpen && (
        <div className={s.reset} onClick={() => handleReset()}>
          &times;
        </div>
      )}
      <div
        className={s.selectedValue}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {selectedValue}
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      <div className={cn(s.options, { [s.open]: isOpen })}>
        {options.slice(1, options.length).map((option) => (
          <div
            key={option}
            className={s.option}
            onClick={() => handleChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectList;
