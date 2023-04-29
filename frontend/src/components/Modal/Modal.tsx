import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { usePortal } from "../../hooks/usePortal";
import { getFocusableElements } from "../../utils/getFocusableElements";
import { nextFocus } from "../../utils/nextFocus";

type IModal = {
  children: string | JSX.Element | JSX.Element[];
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  open?: boolean;
};

const Frame = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}: IModal) => {
  const portal = usePortal();
  const previousFocus = useRef<HTMLElement | null>(null);

  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "Escape": {
          if (closeOnEsc) onClose();
          break;
        }
        case "Tab": {
          e.preventDefault();
          nextFocus(getFocusableElements(container.current), !e.shiftKey);
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    document
      .getElementById("root")
      ?.setAttribute("aria-hidden", open.toString());
    portal.current?.setAttribute("aria-hidden", (!open).toString());

    if (open) {
      previousFocus.current = (document.activeElement as HTMLElement) ?? null;
      nextFocus(getFocusableElements(container.current));
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;
    }
  }, [open, portal]);

  return ReactDOM.createPortal(
    <div
      className={`${styles.content} ${
        open ? styles.visible : styles.invisible
      }`}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      <div className={styles.boxModal} ref={container}>
        <div className={styles.bodyModal}>{children}</div>
        <button
          className={styles.btnClose}
          onClick={() => onClose()}
          title="Fechar"
        >
          <span>&times;</span>
        </button>
      </div>
    </div>,
    portal.current
  );
};

const Head = ({ children }: any) => (
  <div className={styles.headModal}>
    <span>{children}</span>
  </div>
);

const Body = ({ children }: any) => <div>{children}</div>;

export const Modal = { Frame, Head, Body };
