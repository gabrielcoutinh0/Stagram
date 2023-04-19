import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";

export function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <i aria-label="Stagram" role="img" />
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
          <IconContext.Provider value={{ className: "icon", size: "1.5rem" }}>
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
              <button
                aria-label={`Change theme to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
                role="switch"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <BsGear />
                <span className={styles.tooltiptext}>Settings</span>
              </button>
            </div>
            <div className={styles.tooltip}>
              <div className={styles.perfil}></div>
              <span className={styles.tooltiptext}>Perfil</span>
            </div>
          </IconContext.Provider>
        </nav>
      </div>
      <div className={styles.separator} />
    </header>
  );
}
