import { FormEvent, useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { login, reset } from "../../slices/authSlice";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

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
      <div className="center">
        <div className="box" style={{ marginBottom: 0 }}>
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
                  profile={false}
                  aria-label="Nome de usuário"
                  aria-required={true}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="username"
                  name="username"
                  maxLength={30}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  disabled={loading}
                  label="Nome de usuário"
                />
              </div>
              <div className={`${styles.inputWrapper} ${styles.password}`}>
                <Input
                  profile={false}
                  aria-label="Senha"
                  aria-required={true}
                  autoCapitalize="off"
                  autoComplete="new-password"
                  autoCorrect="off"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={loading}
                  password={password}
                  onclick={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                  label="Senha"
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  loading={loading}
                  disabled={
                    loading ||
                    (username && password) === "" ||
                    password.length <= 5
                  }
                >
                  Entrar
                </Button>
              </div>
              {(error as boolean) && (
                <div className="errors">
                  <p aria-atomic="true" role="alert">
                    {error as string}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="box" style={{ marginBottom: 45 }}>
          <p className={styles.account}>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
