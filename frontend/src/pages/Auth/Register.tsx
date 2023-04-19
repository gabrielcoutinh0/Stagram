import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { FormEvent } from "react";

export function Register() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                  />
                  <span>Senha</span>
                </label>
              </div>
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    aria-label="Confirmar senha"
                    aria-required="true"
                    autoCapitalize="off"
                    autoCorrect="off"
                    name="confirmPassword"
                    type="password"
                    placeholder=" "
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
                <button className="btn-cta">Cadastre-se</button>
              </div>
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
