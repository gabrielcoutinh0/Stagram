import { ButtonHTMLAttributes } from "react";

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: string | JSX.Element | JSX.Element[];
}

export function Button({ loading, children, ...rest }: ButtonType) {
  return (
    <button className="btn-cta" {...rest}>
      {loading ? "Aguarde..." : `${children}`}
    </button>
  );
}
