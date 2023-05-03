import styles from "./ModalAddPhoto.module.css";
import { useDispatch } from "react-redux";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { IPhoto } from "../../utils/type";
import { publishPhoto, resetMessage } from "../../slices/photoSlice";
import { resizeImage } from "../../utils/resizeImage";

export const ModalAddPhoto = ({ modal }: any) => {
  const [params, setParams] = useSearchParams();
  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState<File | null | Blob>();

  const navigate = useNavigate();

  const { error, loading, message } = useSelector(
    (state: RootState) => state.user
  );
  const {
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: RootState) => state.photo);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitPhoto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const photoData: IPhoto = {
      title: caption,
      image,
    };

    const formData = new FormData();
    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key as keyof typeof formData.set])
    );

    formData.append("photo", photoFormData as keyof typeof formData.set);

    dispatch(publishPhoto(formData as unknown as IPhoto));

    setTimeout(() => {
      dispatch(resetMessage());
      navigate("/");
    }, 2000);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      resizeImage(e.target.files[0], 468, 468).then((blob) => {
        setPreviewImage(blob as unknown as File);
        setImage(blob as unknown as File);
      });
    }
  };

  useEffect(() => {
    if (!params.get("addPhoto")) {
      setCaption("");
      setPreviewImage(null);
      setImage(null);
    }
  }, [setParams]);

  return (
    <modal.Frame
      open={!!params.get("addPhoto")}
      onClose={() => {
        params.delete("addPhoto");
        setParams(params);
      }}
    >
      <modal.Head>Criar nova publicação</modal.Head>
      <modal.Body>
        <div className={styles.wrapperPhoto}>
          <form onSubmit={handleSubmitPhoto} className={styles.formWrapper}>
            <div
              className={`${styles.pictureButton} ${
                previewImage ? `${styles.active}` : `${styles.disable}`
              }`}
            >
              <label>
                <span role="button">Selecionar do dispositivo</span>
                <input
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleFile(e)}
                />
              </label>
            </div>
            {previewImage && (
              <>
                <div>
                  <div className={styles.previewPhoto}>
                    <img src={URL.createObjectURL(previewImage)} />
                  </div>
                  <div className={styles.textAreaWrapper}>
                    <label>
                      <textarea
                        placeholder="Escreva uma legenda..."
                        value={caption || ""}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={2200}
                      />
                    </label>
                    <div className={styles.textInfo}>
                      <span>{caption.length}/2200</span>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    disabled={loading || !image}
                    loading={loading}
                    type="submit"
                  >
                    Compartilhar foto
                  </Button>
                </div>
              </>
            )}
            {!!messagePhoto && (
              <div className="sucess">
                <p aria-atomic="true" role="alert">
                  {messagePhoto as string}
                </p>
              </div>
            )}
            {(!!errorPhoto as boolean) && (
              <div className="errorPhotos">
                <p aria-atomic="true" role="alert">
                  {errorPhoto as string}
                </p>
              </div>
            )}
          </form>
        </div>
      </modal.Body>
    </modal.Frame>
  );
};
