import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../../hooks/useRequireAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Dropdown } from "../Dropdown/Dropdown";
import { themeType } from "../../utils/type";

export function Navbar({ theme, setTheme }: themeType) {
  const { auth } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

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
                <div className={styles.tooltip}>
                  <Link to="/">
                    <AiOutlineHome />
                    <span className={styles.tooltiptext}>Home</span>
                  </Link>
                </div>
                <div className={styles.tooltip}>
                  <Link to="/">
                    <VscDiffAdded />
                    <span className={styles.tooltiptext}>Add Photo</span>
                  </Link>
                </div>
                <div className={styles.tooltip}>
                  <div className={styles.perfil}></div>
                  <span className={styles.tooltiptext}>Perfil</span>
                </div>
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
