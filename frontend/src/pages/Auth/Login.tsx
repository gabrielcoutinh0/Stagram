import { FormEvent, useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { login, reset } from "../../slices/authSlice";
import Input from "../../components/Input/Input";

export function Login() {
  const dispatch = useAppDispatch();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
                <Input
                  ariaLabel="Nome de usuário"
                  ariaRequired={true}
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="username"
                  maxLength={30}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  disable={loading}
                  label="Nome de usuário"
                />
              </div>
              <div className={`${styles.inputWrapper} ${styles.password}`}>
                <Input
                  ariaLabel="Senha"
                  ariaRequired={true}
                  autoCapitalize="off"
                  autoComplete="new-password"
                  autoCorrect="off"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disable={loading}
                  label="Senha"
                  password={password}
                  onclick={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className="btn-cta"
                  disabled={
                    loading ||
                    (username && password) === "" ||
                    password.length <= 5
                  }
                >
                  {loading ? "Aguarde..." : "Entrar"}
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
