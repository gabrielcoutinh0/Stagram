import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { register, reset } from "../../slices/authSlice";

export function Register() {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
          <h2 tabIndex={-1} className={styles.subtitle}>
            Cadastre-se para ver fotos dos seus amigos.
          </h2>
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    aria-label="E-mail"
                    aria-required="true"
                    autoCapitalize="true"
                    autoComplete="email"
                    autoCorrect="off"
                    name="email"
                    type="email"
                    placeholder=" "
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <span>E-mail</span>
                </label>
              </div>
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    aria-label="Nome completo"
                    aria-required="true"
                    autoCapitalize="sentences"
                    autoCorrect="off"
                    name="fullName"
                    type="text"
                    placeholder=" "
                    disabled={loading}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <span>Nome completo</span>
                </label>
              </div>
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
                    disabled={loading}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  <span>Nome de usuário</span>
                </label>
              </div>
              <div className={`${styles.inputWrapper} ${styles.password}`}>
                <label>
                  <input
                    aria-label="Senha"
                    aria-required="true"
                    autoCapitalize="off"
                    autoComplete="new-password"
                    autoCorrect="off"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <span>Senha</span>
                </label>
                <div className={styles.hiddenPassword}>
                  {password.length >= 1 && (
                    <span onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    aria-label="Confirmar senha"
                    aria-required="true"
                    autoCapitalize="off"
                    autoCorrect="off"
                    name="passwordConfirmation"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    disabled={loading}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={passwordConfirmation}
                  />
                  <span>Confirmar senha</span>
                </label>
              </div>
              <p className={styles.policyAndCookie}>
                <span>
                  Ao se cadastrar, você concorda com nossos Termos, Política de
                  Privacidade e Política de Cookies.
                </span>
              </p>
              <div className={styles.buttonWrapper}>
                <button
                  className="btn-cta"
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
                  {loading ? "Aguarde..." : "Cadastre-se"}
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
            Tem uma conta? <Link to="/login">Conecte-se</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
