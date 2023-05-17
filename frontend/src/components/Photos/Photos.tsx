import styles from "./Photos.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { uploads } from "../../utils/config";
import { IData, IPhoto } from "../../utils/type";
import { getTimeStamp } from "../../utils/getTimeStamp";

import {
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { likePhoto } from "../../slices/photoSlice";
import { resetMessage } from "../../slices/userSlice";
import { IconContext } from "react-icons/lib";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

interface IPhotoProps {
  photo: IPhoto;
  allUsers: IData[] | null;
  user?: IData;
  comments?: boolean;
}

export function Photos({ photo, allUsers }: IPhotoProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useSearchParams();

  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  const handleModalPhoto = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    id: string,
    username: string
  ) => {
    e.preventDefault();
    setParams({ ...params, photo: id });
    console.log(username);
  };

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
  return (
    <article className={styles.articlePhotos}>
      {allUsers &&
        allUsers
          ?.filter((user: IData) => user._id === photo.username)
          .map((filteredUser) => (
            <div style={{ maxWidth: "468px" }} key={photo?._id}>
              <header className={styles.headerPhoto}>
                <Link to={`/${filteredUser?.username}`} tabIndex={0}>
                  <div className={styles.userPostPhoto}>
                    <img
                      key={filteredUser._id}
                      src={`${uploads}/users/${filteredUser?.profileImage}`}
                      alt={`Foto de ${filteredUser?.username}`}
                    />
                  </div>
                </Link>
                <Link
                  to={`/${filteredUser?.username}`}
                  className={styles.username}
                  tabIndex={0}
                >
                  {filteredUser.username}
                </Link>
                <span className={styles.dot}>•</span>
                <div className={styles.datePost}>
                  {getTimeStamp(photo.createdAt as string)}
                </div>
              </header>
              <Link to={`/${filteredUser.username}?photo=${photo._id}`}>
                <div className={styles.wrapperPhoto}>
                  <img src={`${uploads}/photos/${photo.image}`} />
                </div>
              </Link>
              <div className={styles.likesAndComments}>
                <div
                  className={styles.likes}
                  onKeyDown={(e) => handleKeyDownLike(e, photo as IPhoto)}
                  onClick={() => handleLike(photo as IPhoto)}
                  role="button"
                  tabIndex={0}
                  aria-expanded="true"
                >
                  {photo.likes && photo.likes?.includes(userAuth!._id!) ? (
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
                  <span>{photo.likes?.length}</span>
                </div>
                <div className={styles.comments}>
                  <IconContext.Provider
                    value={{ className: `${styles.icons}`, size: "24" }}
                  >
                    <FaRegComment />
                  </IconContext.Provider>
                  <span>{photo.comments?.length}</span>
                </div>
              </div>
              <div className={styles.userAndLegend}>
                <Link
                  to={`/${filteredUser?.username}`}
                  className={styles.username}
                  tabIndex={0}
                >
                  {filteredUser?.username}
                </Link>
                <h3>{photo.title}</h3>
              </div>
            </div>
          ))}
    </article>
  );
}
