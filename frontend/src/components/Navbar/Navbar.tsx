import styles from "./Navbar.module.css";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../../hooks/useRequireAuth";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Dropdown } from "../Dropdown/Dropdown";
import { themeType } from "../../utils/type";
import { ModalAddPhoto } from "../ModalAddPhoto/ModalAddPhoto";
import { Modal } from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { ProfileImage } from "../ProfileImage/ProfileImage";

export function Navbar({ theme, setTheme }: themeType) {
  const { auth } = useAuth();
  const { user: userLogged } = useSelector((state: RootState) => state.auth);

  const [params, setParams] = useSearchParams();

  const handleModalAddPhoto = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setParams({ ...params, addPhoto: "true" });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter" || e.code === "Space") handleModalAddPhoto(e);
  };

  return (
    <>
      {auth && (
        <header className={styles.headerNavbar}>
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
                <Link to="/">
                  <div className={styles.tooltip}>
                    <AiOutlineHome />
                    <span className={styles.tooltiptext}>Home</span>
                  </div>
                </Link>
                <div
                  className={styles.tooltip}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => handleKeyDown(e)}
                  onClick={handleModalAddPhoto}
                >
                  <VscDiffAdded />
                  <span className={styles.tooltiptext}>Add Photo</span>
                </div>
                <Link to={`/${userLogged?.username}`}>
                  <div className={styles.tooltip}>
                    <div className={styles.perfil}>
                      <ProfileImage user={userLogged} />
                    </div>
                    <span className={styles.tooltiptext}>Perfil</span>
                  </div>
                </Link>
              </IconContext.Provider>
              <Dropdown theme={theme} setTheme={setTheme} />
            </nav>
          </div>
          <ModalAddPhoto modal={Modal} />
          <div className={styles.separator} />
        </header>
      )}
    </>
  );
}
