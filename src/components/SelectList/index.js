import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import styles from './styles.module.scss';

function SelectList({ options, onChange }) {
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
    onChange('');
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
    <div className={styles.container}>
      {isResetOpen && (
        <div className={styles.reset} onClick={() => handleReset()}>
          &times;
        </div>
      )}
      <div className={styles.selectedValue} onClick={() => setIsOpen(prevState => !prevState)}>
        {selectedValue}
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      <div className={cn(styles.options, { [styles.open]: isOpen })}>
        {options.slice(1, options.length).map(option => (
          <div
            key={option}
            className={styles.option}
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
