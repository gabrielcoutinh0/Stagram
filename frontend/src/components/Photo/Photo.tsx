import styles from "./Photo.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { uploads } from "../../utils/config";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { IComment, IData, IPhoto } from "../../utils/type";
import { getTimeStamp } from "../../utils/getTimeStamp";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import {
  commentPhoto,
  deleteComment,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  likePhoto,
} from "../../slices/photoSlice";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { useResetMessage } from "../../hooks/useResetMessage";
import { getAllUsers } from "../../slices/usersSlices";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import { Like } from "../Like/Like";

interface IPhotoProps {
  photo: IPhoto;
  user: IData;
  comments?: boolean;
}

export function Photo({ photo, user, comments }: IPhotoProps) {
  const { user: userAuth } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const resetMessage = useResetMessage(dispatch);
  const [params, setParams] = useSearchParams();
  const [caption, setCaption] = useState<string>("");

  const handleDelete = (id: string) => {
    let alert = confirm("Deseja mesmo apagar a foto?");
    if (alert) {
      dispatch(deletePhoto(id));
      params.delete("photo");
      setParams(params);
      resetMessage();
      dispatch(getAllPhotos());
    }
  };

  const handleKeyDownDeletePhoto = (
    e: KeyboardEvent<SVGElement>,
    id: string
  ) => {
    if (e.key === "Enter" || e.code === "Space") handleDelete(id);
  };

  const handleDeleteComment = (photo: IPhoto, comment: IComment) => {
    const ids = {
      idPhoto: photo._id,
      idComment: comment._id,
    };

    let alert = confirm(
      `Deseja mesmo apagar o comentário: ${comment.comment}?`
    );
    if (alert) {
      resetMessage();
      dispatch(deleteComment(ids));
      dispatch(getPhotoById(photo._id as string));
    }
  };

  const handleKeyDownDeleteComment = (
    e: KeyboardEvent<HTMLDivElement>,
    photo: IPhoto,
    comment: IComment
  ) => {
    if (e.key === "Enter" || e.code === "Space")
      handleDeleteComment(photo, comment);
  };

  const handleComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData = {
      comment: caption,
      _id: photo._id,
    };

    dispatch(commentPhoto(commentData));
    setCaption("");
    resetMessage();
    dispatch(getPhotoById(photo._id as string));
  };

  useEffect(() => {
    dispatch(getPhotoById(photo._id as string));
    dispatch(getAllPhotos());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <article key={photo?._id}>
      <div style={{ maxWidth: "468px" }}>
        <header className={styles.headerPhoto}>
          <Link to={`/${user?.username}`} tabIndex={0}>
            <div className={styles.userPostPhoto}>
              <ProfileImage user={user} />
            </div>
          </Link>
          <Link
            to={`/${user?.username}`}
            className={styles.username}
            tabIndex={0}
          >
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
            <Like photo={photo} />
            <div className={styles.comments}>
              <IconContext.Provider
                value={{ className: `${styles.icons}`, size: "24" }}
              >
                <FaRegComment />
              </IconContext.Provider>
              <span>{photo.comments?.length}</span>
            </div>
          </div>
          {userAuth?._id === photo.username && comments && (
            <div className={styles.edit}>
              <IconContext.Provider
                value={{ className: `${styles.icons}`, size: "24" }}
              >
                <BsPencilSquare />
                <BsTrash
                  onKeyDown={(e) =>
                    handleKeyDownDeletePhoto(e, photo._id as string)
                  }
                  onClick={() => handleDelete(photo._id as string)}
                  role="button"
                  tabIndex={0}
                />
              </IconContext.Provider>
            </div>
          )}
        </div>
        <div className={styles.userAndLegend}>
          <Link
            to={`/${user?.username}`}
            className={styles.username}
            tabIndex={0}
          >
            {user?.username}
          </Link>
          <h3>{photo.title}</h3>
        </div>
        {comments && (
          <div className={styles.commentsWrapper}>
            <form onSubmit={handleComment} className={styles.textAreaAndButton}>
              <textarea
                aria-label="Adicione um comentário..."
                placeholder="Adicione um comentário..."
                autoComplete="off"
                autoCorrect="off"
                className={styles.textArea}
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                style={caption.length >= 62 ? { height: "80px" } : {}}
              />
              <button disabled={caption.length <= 0}>Publicar</button>
            </form>

            {photo.comments && photo.comments?.length > 0 ? (
              <ul className={styles.ul}>
                {photo?.comments?.map((comment: IComment) =>
                  users
                    ?.filter((user: IData) => user._id === comment.username)
                    .map((filteredUser) => (
                      <li key={filteredUser._id}>
                        <Link
                          to={`/${filteredUser.username}`}
                          className={styles.imageUserComment}
                          tabIndex={0}
                        >
                          <ProfileImage user={filteredUser} />
                        </Link>
                        <div className={styles.commentAndTime}>
                          <div className={styles.commentAndEdit}>
                            <div className={styles.commentAndusername}>
                              <Link
                                to={`/${filteredUser.username}`}
                                tabIndex={0}
                              >
                                {filteredUser.username}
                              </Link>
                              <span>{comment.comment}</span>
                            </div>
                            {comment.username === userAuth?._id && (
                              <div
                                tabIndex={0}
                                className={styles.delete}
                                role="button"
                                aria-label="Apagar comentário"
                                onKeyDown={(e) =>
                                  handleKeyDownDeleteComment(
                                    e,
                                    photo as IPhoto,
                                    comment as IComment
                                  )
                                }
                                onClick={() =>
                                  handleDeleteComment(
                                    photo as IPhoto,
                                    comment as IComment
                                  )
                                }
                              >
                                <IconContext.Provider
                                  value={{ color: "#fe6464", size: "18" }}
                                >
                                  <MdDeleteForever />
                                </IconContext.Provider>
                              </div>
                            )}
                          </div>
                          <div className={styles.timeComment}>
                            <span>
                              {getTimeStamp(comment.createdAt as string)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                )}
              </ul>
            ) : (
              <span className={styles.notComment}>
                Ainda não há nenhum comentário.
                <p>Seja o primeiro a comentar</p>
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
