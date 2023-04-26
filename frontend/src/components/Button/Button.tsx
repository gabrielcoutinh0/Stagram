type ButtonType = {
  loading: boolean;
  disable: boolean;
  children: string | JSX.Element | JSX.Element[];
};

export function Button({ loading, disable, children }: ButtonType) {
  return (
    <button className="btn-cta" disabled={disable}>
      {loading ? "Aguarde..." : `${children}`}
    </button>
  );
}
