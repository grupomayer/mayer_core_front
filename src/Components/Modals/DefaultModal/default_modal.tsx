import classNames from "classnames";
import styles from "./default_modal.module.scss";

interface IDefaultModal {
  size: "sm" | "md" | "lg" | "xl",
  title: string,
  onClose: Function | false,
  children?: any
}
function DefaultModal({ size, title, children, onClose }: IDefaultModal) {

  function closeFunction() {
    if(onClose) {
      onClose();
    }
  }

  return (
    <div className={styles.background}>
      <section className={classNames({
        [styles.modal]: true,
        [styles.sm]: size === "sm",
        [styles.md]: size === "md",
        [styles.lg]: size === "lg",
        [styles.xl]: size === "xl",
      })}>
        <div className={styles.modal__header}>
          <h1 className={styles.modal__header__title}>
            {title}
          </h1>
          {onClose !== false && (
            <div 
              className={styles.modal__header__close} 
              onClick={closeFunction} 
              tabIndex={0} 
              onKeyDown={e => e.key === "Enter" ? closeFunction : undefined} 
            >&#x274C;</div>
          )}
        </div>
        <hr />
        <div className={styles.modal__body}>
          {children}
        </div>
        <hr />
      </section>
    </div>
  )
}

export default DefaultModal;