import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import styles from "./EditProfile.module.css";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import { IData } from "../../utils/type";
import { useSearchParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { ModalPassword } from "../../components/ModalPassword/ModalPassword";

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

  const [params, setParams] = useSearchParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.get("changePassword")) {
      const userData: IData = {};

      if (name) Object.assign(userData, { name: name });
      if (profileImage) Object.assign(userData, { profileImage: profileImage });
      if (bio) Object.assign(userData, { bio: bio });

      const formData = new FormData();

      const userFormData = Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key as keyof typeof formData.set]);
      });

      formData.append("user", userFormData as keyof typeof formData.set);

      await dispatch(updateProfile(formData as IData));

      setTimeout(() => {
        dispatch(resetMessage());
      }, 2000);
    }
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
  }, [dispatch, setParams]);

  useEffect(() => {
    if (user) {
      user.username ? setUsername(user.username) : "";
      user.name ? setName(user.name) : "";
      user.email ? setEmail(user.email) : "";
      user.bio ? setBio(user.bio) : "";
      user.profileImage ? setProfileImage(user.profileImage) : "";
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
            <Button disabled={loading} loading={loading} type="submit">
              Enviar
            </Button>
            <span
              role="button"
              onClick={() => setParams({ ...params, changePassword: "true" })}
            >
              Mudar senhar
            </span>
            <ModalPassword modal={Modal} />
          </div>
          {!params.get("changePassword") && message && (
            <div className="sucess">
              <p aria-atomic="true" role="alert">
                {message as string}
              </p>
            </div>
          )}
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
