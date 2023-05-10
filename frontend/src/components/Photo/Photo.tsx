import styles from "./Photo.module.css";
import { Link, useNavigate } from "react-router-dom";
import { uploads } from "../../utils/config";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { IData, IPhoto } from "../../utils/type";
import { getTimeStamp } from "../../utils/getTimeStamp";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { deletePhoto, getAllPhotos, likePhoto } from "../../slices/photoSlice";
import { useEffect } from "react";
import { useResetMessage } from "../../hooks/useResetMessage";

interface IPhotoProps {
  photo: IPhoto;
  user: IData;
  comments?: boolean;
}

export function Photo({ photo, user, comments }: IPhotoProps) {
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const resetMessage = useResetMessage(dispatch);

  const handleDelete = (id: string) => {
    dispatch(deletePhoto(id));
    navigate("/");
    resetMessage();
  };

  const handleLike = (photo: IPhoto) => {
    dispatch(likePhoto(photo._id as string));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getAllPhotos);
  }, [dispatch]);

  console.log(photo.likes);

  return (
    <article key={photo._id}>
      <div>
        <header className={styles.headerPhoto}>
          <Link to={`/${user?.username}`}>
            <div className={styles.userPostPhoto}>
              <img
                src={`${uploads}/users/${user?.profileImage}`}
                alt={`Foto de ${user?.username}`}
              />
            </div>
          </Link>
          <Link to={`/${user?.username}`} className={styles.username}>
            {user?.username}
          </Link>
          <span className={styles.dot}>•</span>
          <div className={styles.datePost}>
            {getTimeStamp(photo.createdAt as string)}
          </div>
        </header>
        <div className={styles.wrapperPhoto}>
          <img src={`${uploads}/photos/${photo.image}`} />
        </div>
        <div className={styles.iconsPhoto}>
          <div className={styles.likesAndComments}>
            <div
              className={styles.likes}
              onClick={() => handleLike(photo as IPhoto)}
              role="button"
            >
              {photo.likes && photo.likes?.includes(userAuth!._id!) ? (
                <IconContext.Provider value={{ color: "red", size: "24" }}>
                  <FaHeart />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ color: "white", size: "24" }}>
                  <FaRegHeart />
                </IconContext.Provider>
              )}
              <span>{photo.likes?.length}</span>
            </div>
            <div className={styles.comments}>
              <IconContext.Provider value={{ color: "white", size: "24" }}>
                <FaRegComment />
              </IconContext.Provider>
              <span>{photo.comments?.length}</span>
            </div>
          </div>
          {userAuth?._id === photo.username && comments && (
            <div className={styles.edit}>
              <IconContext.Provider value={{ color: "white", size: "24" }}>
                <BsPencilSquare />
                <BsTrash onClick={() => handleDelete(photo._id as string)} />
              </IconContext.Provider>
            </div>
          )}
        </div>
        <div className={styles.userAndLegend}>
          <Link to={`/${user?.username}`} className={styles.username}>
            {user?.username}
          </Link>
          <h3>{photo.title}</h3>
        </div>
      </div>
    </article>
  );
}
