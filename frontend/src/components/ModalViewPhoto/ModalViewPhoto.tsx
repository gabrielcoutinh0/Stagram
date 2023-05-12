import styles from "./ModalViewPhoto.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getPhotoById } from "../../slices/photoSlice";
import { Link } from "react-router-dom";
import { Photo } from "../Photo/Photo";
import { IData, IPhoto } from "../../utils/type";

export const ModalViewPhoto = ({ modal }: any) => {
  const [params, setParams] = useSearchParams();

  const { user, error, loading, message } = useSelector(
    (state: RootState) => state.user
  );
  const {
    photo,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: RootState) => state.photo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.get("photo") !== null)
      dispatch(getPhotoById(params.get("photo") as string));
  }, [dispatch, params]);

  return (
    <modal.Frame
      open={!!params.get("photo")}
      onClose={() => {
        params.delete("photo");
        setParams(params);
      }}
    >
      <modal.Body>
        {photo !== null ? (
          <Photo photo={photo as IPhoto} user={user as IData} comments={true} />
        ) : (
          <div className={styles.notFound}>
            <div>
              <span>Esta página não está disponível.</span>
              <p>
                O link em que você clicou pode não estar funcionando, ou a
                página pode ter sido removida.{" "}
                <Link to="/">Voltar para o Instagram.</Link>
              </p>
            </div>
          </div>
        )}
      </modal.Body>
    </modal.Frame>
  );
};
