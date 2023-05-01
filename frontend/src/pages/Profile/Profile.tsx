import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";

export function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector((state: RootState) => state.user);
  const { user: userAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails(id as string));
  }, [dispatch, id]);

  if (loading) return <p>Carregando...</p>;

  console.log(user);
  console.log(userAuth);
  //{user?._id === userAuth?._id && <button>editar</button>}

  return (
    <div className={styles.container}>
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
          <div>
            <span className={styles.nameProfile}>{user?.name}</span>
            <div className={styles.bio}>
              <span>{user?.bio}</span>
            </div>
          </div>
        </section>
      </header>
      <div className={styles.separator} />
    </div>
  );
}
