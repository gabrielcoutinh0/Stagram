import { FormEvent } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

export function Login() {
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
              <div className={styles.buttonWrapper}>
                <button className="btn-cta">Entrar</button>
              </div>
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
