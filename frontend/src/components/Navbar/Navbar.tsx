import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../../hooks/useRequireAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Dropdown } from "../Dropdown/Dropdown";
import { themeType } from "../../utils/type";
import { uploads } from "../../utils/config";
import { ModalAddPhoto } from "../ModalAddPhoto/ModalAddPhoto";
import { Modal } from "../Modal/Modal";

export function Navbar({ theme, setTheme }: themeType) {
  const [params, setParams] = useSearchParams();

  const { user } = useSelector((state: RootState) => state.auth);
  const { auth } = useAuth();

  useEffect(() => {}, []);

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
                <Link to="/">
                  <div className={styles.tooltip}>
                    <AiOutlineHome />
                    <span className={styles.tooltiptext}>Home</span>
                  </div>
                </Link>
                <div
                  className={styles.tooltip}
                  role="button"
                  onClick={() => setParams({ ...params, addPhoto: "true" })}
                >
                  <VscDiffAdded />
                  <span className={styles.tooltiptext}>Add Photo</span>
                </div>
                <Link to={`/${user?.username}`}>
                  <div className={styles.tooltip}>
                    <div className={styles.perfil}>
                      {user?.profileImage ? (
                        <img
                          src={`${uploads}/users/${user?.profileImage}`}
                          alt={`Foto de ${user?.username}`}
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
          <ModalAddPhoto modal={Modal} />
          <div className={styles.separator} />
        </header>
      )}
    </>
  );
}
