import styles from "./ModalPassword.module.css";
import Input from "../Input/Input";
import { useDispatch } from "react-redux";
import { useState, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { updateProfile } from "../../slices/userSlice";
import { IData } from "../../utils/type";
import { useResetMessage } from "../../hooks/useResetMessage";

export const ModalPassword = ({ modal }: any) => {
  const [params, setParams] = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const { error, loading, message } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const resetMessage = useResetMessage(dispatch);

  const handleSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
    setErrorPassword(null);
    e.preventDefault();

    if (password === newPassword) {
      setErrorPassword("A nova senha não pode ser igual a senha atual.");
      return;
    }
    if (newPassword !== newPasswordConfirmation) {
      setErrorPassword("A confirmação da nova senha não está igual!");
      return;
    }
    const passwordData: IData = {
      password,
      newPassword,
      newPasswordConfirmation,
    };

    const formData = new FormData();

    const userFormData = Object.keys(passwordData).forEach((key) => {
      formData.append(key, passwordData[key as keyof typeof formData.set]);
    });

    formData.append("user", userFormData as keyof typeof formData.set);

    await dispatch(updateProfile(formData as IData));
    setPassword("");
    setNewPassword("");
    setNewPasswordConfirmation("");

    resetMessage();
  };

  return (
    <modal.Frame
      open={!!params.get("changePassword")}
      onClose={() => {
        params.delete("changePassword");
        setParams(params);
      }}
    >
      <modal.Head>Alterar senha</modal.Head>
      <modal.Body>
        <div className={styles.wrapperPassword}>
          <form onSubmit={handleSubmitPassword} className={styles.formWrapper}>
            <Input
              profile={true}
              aria-label="Nome de usuário"
              aria-required={true}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="username"
              tabIndex={-1}
              name="username"
              maxLength={30}
              type="text"
              label="Nome de usuário"
              hidden
            />
            <Input
              profile={true}
              aria-label="Senha"
              aria-required={true}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="current-password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading}
              label="Senha"
            />
            <Input
              profile={true}
              aria-label="Nova senha"
              aria-required={true}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="new-password"
              name="newPasswordConfirmation"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              disabled={loading}
              label="Nova senha"
            />
            <Input
              profile={true}
              aria-label="Confirmar nova senha"
              aria-required={true}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="new-password"
              name="newPasswordConfirmation"
              type="password"
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              value={newPasswordConfirmation}
              disabled={loading}
              label="Confirmar nova senha"
            />
            <div className={styles.buttonWrapper}>
              <Button
                disabled={
                  loading ||
                  password.length <= 5 ||
                  newPassword.length <= 5 ||
                  newPasswordConfirmation.length <= 5
                }
                loading={loading}
                type="submit"
              >
                Alterar senha
              </Button>
            </div>
            {message && (
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
                  <br />
                  {errorPassword}
                </p>
              </div>
            )}
          </form>
        </div>
      </modal.Body>
    </modal.Frame>
  );
};
