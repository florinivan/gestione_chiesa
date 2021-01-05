import React from 'react';
import styles from 'shared/atomic-ui/SwitchButton/switchButton.module.scss';

const { switch: switchCss, slider: sliderCss, round: roundCss, checkbox: checkboxCss } = styles;

interface SwitchButtonProps {
  isChecked: boolean;
  setIsChecked: () => void;
}

export const SwitchButton: React.FC<SwitchButtonProps> = React.memo(
  ({ isChecked, setIsChecked }) => {
    return (
      <div className={switchCss} onClick={setIsChecked}>
        <input
          className={checkboxCss}
          type="checkbox"
          checked={isChecked}
          onChange={setIsChecked}
        />
        <span className={`${sliderCss} ${roundCss}`}></span>
      </div>
    );
  }
);
