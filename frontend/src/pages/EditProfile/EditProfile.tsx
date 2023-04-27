import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import styles from "./EditProfile.module.css";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { profile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

export function EditProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | File>("");
  const [previewImage, setPreviewImage] = useState<File>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    return;
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const image = e.target.files[0];
      setPreviewImage(image);
      setProfileImage(image);
    }
  };

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      user.bio ? setBio(user.bio) : "";
    }
  }, [user]);

  return (
    <article className="center">
      <div className="box" style={{ maxWidth: "692px" }}>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div className={styles.pictureAndUsername}>
            <div className={styles.picture}>
              {user?.profileImage || previewImage ? (
                <img
                  src={
                    previewImage
                      ? URL.createObjectURL(previewImage)
                      : `${uploads}/users/${user?.profileImage}`
                  }
                  alt={`Foto de ${user?.name}`}
                />
              ) : (
                <img src="./userWithoutPhoto.jpg" alt="Usuário sem foto" />
              )}
            </div>
            <div className={styles.updatePhoto}>
              <div className={styles.username}>
                <span>{username}</span>
              </div>
              <div className={styles.pictureButton}>
                <label>
                  <span role="button">Alterar foto do perfil</span>
                  <input
                    name="profileImage"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleFile(e)}
                  />
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
            <Button disable={loading} loading={loading}>
              Enviar
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
    </article>
  );
}
