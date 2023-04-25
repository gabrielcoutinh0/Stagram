import { FormEvent, useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { login, reset } from "../../slices/authSlice";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div
            className={`logo ${styles.logo}`}
            aria-disabled="false"
            role="button"
            data-focus-visible-added
          >
            <i aria-label="Stagram" role="img" tabIndex={0} />
          </div>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    aria-label="Nome de usuário"
                    aria-required="true"
                    autoCapitalize="off"
                    autoCorrect="off"
                    name="username"
                    maxLength={30}
                    type="text"
                    placeholder=" "
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    disabled={loading}
                  />
                  <span>Nome de usuário</span>
                </label>
              </div>
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    aria-label="Senha"
                    aria-required="true"
                    autoCapitalize="off"
                    autoComplete="new-password"
                    autoCorrect="off"
                    name="password"
                    type="password"
                    placeholder=" "
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    disabled={loading}
                  />
                  <span>Senha</span>
                </label>
              </div>
              <div className={styles.buttonWrapper}>
                <button className="btn-cta" disabled={loading}>
                  Entrar
                </button>
              </div>
              {(error as boolean) && (
                <div className={styles.errors}>
                  <p aria-atomic="true" role="alert">
                    {error as string}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.account}>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
