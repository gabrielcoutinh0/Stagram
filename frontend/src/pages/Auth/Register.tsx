import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { register, reset } from "../../slices/authSlice";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export function Register() {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    };

    dispatch(register(user));
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
          <h2 tabIndex={-1} className={styles.subtitle}>
            Cadastre-se para ver fotos dos seus amigos.
          </h2>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <Input
                  profile={false}
                  aria-label="E-mail"
                  aria-required={true}
                  autoCapitalize="true"
                  autoCorrect="off"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={loading}
                  label="E-mail"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  profile={false}
                  aria-label="Nome completo"
                  aria-required={true}
                  autoCapitalize="sentences"
                  autoCorrect="off"
                  name="fullName"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  disabled={loading}
                  label="Nome completo"
                />
              </div>
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
                  wantShowPassword={true}
                  aria-label="Senha"
                  aria-required={true}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="new-password"
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
              <div className={styles.inputWrapper}>
                <Input
                  profile={false}
                  aria-label="Confirmar senha"
                  aria-required={true}
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="passwordConfirmation"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                  disabled={loading}
                  label="Confirmar senha"
                />
              </div>
              <p className={styles.policyAndCookie}>
                <span>
                  Ao se cadastrar, você concorda com nossos Termos, Política de
                  Privacidade e Política de Cookies.
                </span>
              </p>
              <div className={styles.buttonWrapper}>
                <Button
                  loading={loading}
                  disabled={
                    loading ||
                    (email &&
                      name &&
                      username &&
                      password &&
                      passwordConfirmation) === "" ||
                    password.length <= 5
                  }
                >
                  Cadastre-se
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
            Tem uma conta? <Link to="/login">Conecte-se</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
