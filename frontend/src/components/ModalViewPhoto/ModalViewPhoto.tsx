import styles from "./ModalViewPhoto.module.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { IPhoto } from "../../utils/type";
import { publishPhoto, resetMessage } from "../../slices/photoSlice";
import { uploads } from "../../utils/config";
import { useSearchParams } from "react-router-dom";

export const ModalViewPhoto = ({ modal }: any) => {
  const [params, setParams] = useSearchParams();

  const { error, loading, message } = useSelector(
    (state: RootState) => state.user
  );
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: RootState) => state.photo);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <modal.Frame
      open={!!params.get("photo")}
      onClose={() => {
        params.delete("photo");
        setParams(params);
      }}
    >
      <modal.Head></modal.Head>
      <modal.Body>
        <div className={styles.wrapperPhoto}>
          {photos.map(
            (photo) =>
              photo["_id"] === params.get("photo") && (
                <div key={photo["_id"]} className={styles.photos}>
                  <img src={`${uploads}/photos/${photo["image"]}`} />
                </div>
              )
          )}
        </div>
      </modal.Body>
    </modal.Frame>
  );
};
