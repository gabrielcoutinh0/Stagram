import styles from "./Dropdown.module.css";
import { useRef, useState, useEffect } from "react";
import { BsGear } from "react-icons/bs";
import { BsMoon, BsSun } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout, reset } from "../../slices/authSlice";
import { useAuth } from "../../hooks/useRequireAuth";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { themeType } from "../../utils/type";

export const Dropdown = ({ theme, setTheme }: themeType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { auth } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themeMode = theme === "light" ? "dark" : "light";
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(!open));

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div
      ref={ref}
      className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        <IconContext.Provider value={{ size: "24" }}>
          <BsGear />
        </IconContext.Provider>
      </button>
      <div className={styles.menu}>
        <button
          aria-label={`Change theme to ${themeMode} mode`}
          role="switch"
          onClick={() => setTheme(themeMode)}
        >
          {theme === "light" ? <BsMoon /> : <BsSun />}
          <span>Modo {theme === "light" ? "Escuro" : "Claro"}</span>
        </button>
        {auth && (
          <button onClick={handleLogout}>
            <span>Sair</span>
          </button>
        )}
      </div>
    </div>
  );
};
