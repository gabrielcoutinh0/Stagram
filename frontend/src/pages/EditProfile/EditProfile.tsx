import { useState } from "react";
import styles from "./EditProfile.module.css";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export function EditProfile() {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    return;
  };
  return (
    <article className="center">
      <div className="box" style={{ maxWidth: "692px" }}>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div className={styles.pictureAndUsername}>
            <div className={styles.picture}>
              <div role="img"></div>
            </div>
            <div className={styles.updatePhoto}>
              <div className={styles.username}>
                <span>username</span>
              </div>
              <div role="button" tabIndex={0} className={styles.pictureButton}>
                <label>
                  <input
                    aria-required={false}
                    name="photo"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <span>Alterar foto do perfil</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <Input
              profile={true}
              aria-required={false}
              placeholder="Nome"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome"
            />
            <div className={styles.textInfo}>
              <span>
                Ajude as pessoas a descobrir sua conta usando o nome pelo qual
                você é conhecido: seu nome completo, apelido ou nome comercial.
              </span>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <Input
              profile={true}
              aria-required={false}
              placeholder="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={true}
              label="E-mail"
            />
          </div>
          <div className={styles.textAreaWrapper}>
            <label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={150}
              />
              <span>Biografia</span>
            </label>
            <div className={styles.textInfo}>
              <span>{bio.length}/150</span>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button disable={false} loading={false}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
}
