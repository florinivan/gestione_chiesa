import React, { ReactElement } from 'react';
import classNames from 'classnames';
import styles from 'shared/atomic-ui/RadioButton/radioButton.module.scss';

interface RadioButtonProps {
  classNameRadio?: string;
  id: string;
  name: string;
  checked?: boolean;
  onChange(): void;
  label: string | ReactElement;
}

export const RadioButton = React.memo(function RadioButton({
  classNameRadio,
  id,
  name,
  checked,
  onChange,
  label
}: RadioButtonProps) {
  return (
    <label htmlFor={id} className={`${styles.button} d-flex align-items-center`}>
      <input
        id={id}
        name={name}
        className={classNames(classNameRadio, styles.radioButton)}
        onChange={onChange}
        type="radio"
        checked={checked}
      />
      <span className={styles.overlay}></span>
      <div className={styles.label}>{label}</div>
    </label>
  );
});
