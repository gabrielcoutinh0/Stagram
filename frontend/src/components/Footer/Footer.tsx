import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer>
      <div className={styles.separator} />
      <div className={styles.footer}>
        &copy; {new Date().getFullYear()} Stagram
      </div>
    </footer>
  );
}
