import { ChangeEventHandler, MouseEventHandler } from "react";
import styles from "./Input.module.css";

type InputType = {
  ariaLabel: string;
  ariaRequired: boolean;
  autoCapitalize: string;
  autoComplete?: string;
  autoCorrect?: string;
  name: string;
  maxLength?: number;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  disable: boolean;
  label: string;
  password?: string;
  onclick?: MouseEventHandler<HTMLSpanElement>;
  showPassword?: boolean;
};

function Input({
  ariaLabel,
  ariaRequired,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  name,
  maxLength,
  type,
  onChange,
  value,
  disable,
  label,
  password,
  onclick,
  showPassword,
}: InputType) {
  return (
    <>
      <label className={styles.label}>
        <input
          aria-label={ariaLabel}
          aria-required={ariaRequired}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          name={name}
          maxLength={maxLength}
          type={type}
          placeholder=" "
          onChange={onChange}
          value={value}
          disabled={disable}
        />
        <span>{label}</span>
      </label>

      {name === "password" && (
        <div className={styles.hiddenPassword}>
          {password!.length >= 1 && (
            <button type="button" data-focus-visible-added onClick={onclick}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Input;
