import { useAuth } from "../../hooks/useAuth";
import styles from "./Footer.module.css";

export function Footer() {
  const { auth } = useAuth();
  return (
    <>
      {!auth && (
        <footer>
          <div className={styles.separator} />
          <div className={styles.footer}>
            &copy; {new Date().getFullYear()} Stagram
          </div>
        </footer>
      )}
    </>
  );
}
