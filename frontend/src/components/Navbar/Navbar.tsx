import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../../hooks/useRequireAuth";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../slices/authSlice";
import { Dropdown } from "../Dropdown/Dropdown";

export function Navbar() {
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
              <Dropdown />
            </nav>
          </div>
          <div className={styles.separator} />
        </header>
      )}
    </>
  );
}
