import { useParams, useSearchParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { getAllPhotos, getUserPhotos } from "../../slices/photoSlice";
import { ModalViewPhoto } from "../../components/ModalViewPhoto/ModalViewPhoto";
import { Modal } from "../../components/Modal/Modal";

export function Profile() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state: RootState) => state.photo);

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails(id as string));
    dispatch(getAllPhotos());
  }, [dispatch, id]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      {error ? (
        <div className={styles.notProfile}>
          <span>Esta página não está disponível.</span>
          <p>
            O link em que você clicou pode não estar funcionando, ou a página
            pode ter sido removida. <Link to="/">Voltar para o Instagram.</Link>
          </p>
        </div>
      ) : (
        <>
          <header className={styles.headerProfile}>
            <div className={styles.wrapperPicture}>
              <div className={styles.picture}>
                {user?.profileImage ? (
                  <img
                    src={`${uploads}/users/${user?.profileImage}`}
                    alt={`Foto de ${user?.name}`}
                  />
                ) : (
                  <img src="/userWithoutPhoto.jpg" alt="Usuário sem foto" />
                )}
              </div>
            </div>
            <section className={styles.dataProfile}>
              <div className={styles.wrapperUsernameAndEdit}>
                <h2>{user?.username}</h2>
                {user?._id === userAuth?._id && (
                  <Link to="/profile/edit">
                    <div className={styles.btnEdit}>Editar perfil</div>
                  </Link>
                )}
              </div>
              <div className={styles.publications}>
                <span>{user?.photosPosted?.length} </span>
                publicações
              </div>
              <div className={styles.nameAndBio}>
                <span className={styles.nameProfile}>{user?.name}</span>
                <div className={styles.bio}>
                  <span>{user?.bio}</span>
                </div>
              </div>
            </section>
          </header>
          <div className={styles.publicationsMobile}>
            <span>{user?.photosPosted?.length} </span>
            publicações
          </div>
          <div className={styles.nameAndBioMobile}>
            <span className={styles.nameProfile}>{user?.name}</span>
            <div className={styles.bio}>
              <span>{user?.bio}</span>
            </div>
          </div>
          <div className={styles.separator} />
          {userAuth ? (
            <article className={styles.articleProfile}>
              {photos.map(
                (photo) =>
                  photo["username"] === user?._id && (
                    <div
                      key={photo["_id"]}
                      className={styles.photos}
                      onClick={() =>
                        setParams({ ...params, photo: photo["_id"] })
                      }
                      role="button"
                    >
                      <img src={`${uploads}/photos/${photo["image"]}`} />
                    </div>
                  )
              )}
              <ModalViewPhoto modal={Modal} />
            </article>
          ) : (
            <p className={styles.notLoggin}>
              <Link to="/login">Acesse sua conta</Link> para visualizar as fotos
              de {user?.username} ou <Link to="/register">crie uma.</Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}
