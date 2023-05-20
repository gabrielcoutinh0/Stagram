import styles from "./Like.module.css";
import { KeyboardEvent, useEffect } from "react";
import { IPhoto } from "../../utils/type";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { likePhoto } from "../../slices/photoSlice";
import { IconContext } from "react-icons/lib";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useResetMessage } from "../../hooks/useResetMessage";

interface LikeProps {
  photo: IPhoto;
}

export function Like({ photo }: LikeProps) {
  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const resetMessage = useResetMessage(dispatch);

  const handleLike = (photo: IPhoto) => {
    dispatch(likePhoto(photo._id as string));
    resetMessage();
  };

  const handleKeyDownLike = (
    e: KeyboardEvent<HTMLDivElement>,
    photo: IPhoto
  ) => {
    if (e.key === "Enter" || e.code === "Space") handleLike(photo);
  };

  useEffect(() => {}, []);

  return (
    <div
      className={styles.likes}
      onKeyDown={(e) => handleKeyDownLike(e, photo as IPhoto)}
      onClick={() => handleLike(photo as IPhoto)}
      role="button"
      tabIndex={0}
      aria-expanded="true"
    >
      {photo.likes && photo.likes?.includes(userAuth?._id as string) ? (
        <IconContext.Provider value={{ color: "red", size: "24" }}>
          <FaHeart />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider
          value={{ className: `${styles.icons}`, size: "24" }}
        >
          <FaRegHeart />
        </IconContext.Provider>
      )}
      <span className={styles.qntLike}>{photo.likes?.length}</span>
    </div>
  );
}
