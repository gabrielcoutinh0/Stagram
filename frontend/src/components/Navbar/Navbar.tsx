import styles from "./Navbar.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../../hooks/useRequireAuth";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Dropdown } from "../Dropdown/Dropdown";
import { themeType } from "../../utils/type";
import { useDispatch } from "react-redux";
import { profile } from "../../slices/userSlice";
import { uploads } from "../../utils/config";

export function Navbar({ theme, setTheme }: themeType) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, message, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  const { auth } = useAuth();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <>
      {auth && (
        <header>
          <div className={styles.container}>
            <div
              className="logo"
              aria-disabled="false"
              role="button"
              tabIndex={0}
              data-focus-visible-added
            >
              <i
                data-visualcompletion="css-img"
                aria-label="Stagram"
                role="img"
              />
            </div>
            <div className={styles.search}>
              <form>
                <input
                  type="search"
                  placeholder="Pesquisar"
                  autoCapitalize="none"
                  aria-label="Entrada da pequisa"
                />
              </form>
            </div>
            <nav>
              <IconContext.Provider
                value={{ className: "icon", size: "1.5rem" }}
              >
                <Link to="/" className={styles.tooltip}>
                  <div>
                    <AiOutlineHome />
                    <span className={styles.tooltiptext}>Home</span>
                  </div>
                </Link>
                <Link to="/" className={styles.tooltip}>
                  <div>
                    <VscDiffAdded />
                    <span className={styles.tooltiptext}>Add Photo</span>
                  </div>
                </Link>
                <Link to="/profile">
                  <div className={styles.tooltip}>
                    <div className={styles.perfil}>
                      {user?.profileImage ? (
                        <img
                          src={`${uploads}/users/${user?.profileImage}`}
                          alt={`Foto de ${user?.name}`}
                        />
                      ) : (
                        <img
                          src="./userWithoutPhoto.jpg"
                          alt="Usuário sem foto"
                        />
                      )}
                    </div>
                    <span className={styles.tooltiptext}>Perfil</span>
                  </div>
                </Link>
              </IconContext.Provider>
              <Dropdown theme={theme} setTheme={setTheme} />
            </nav>
          </div>
          <div className={styles.separator} />
        </header>
      )}
    </>
  );
}
