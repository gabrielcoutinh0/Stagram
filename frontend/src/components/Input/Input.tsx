import styles from "./Input.module.css";
import { InputHTMLAttributes, MouseEventHandler } from "react";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  profile: boolean;
  name: string;
  type: string;
  label: string;
  password?: string;
  onclick?: MouseEventHandler<HTMLSpanElement>;
  showPassword?: boolean;
}

function Input({
  profile,
  name,
  type,
  label,
  password,
  onclick,
  showPassword,
  ...rest
}: InputType) {
  return (
    <>
      <label className={profile ? `${styles.labelProfile}` : `${styles.label}`}>
        <input name={name} type={type} placeholder=" " {...rest} />
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
