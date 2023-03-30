import classNames from "classnames";
import { memo, MouseEventHandler } from "react";
import styles from "./default_button.module.scss";

interface IDefaultButton {
  label: string,
  type: "button" | "submit" | "reset",
  id?: string,
  className?: string,
  variant?: "default" | "red",
  disabled?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>
}
function DefaultButton({ label, type, className, id, variant = "red", disabled, onClick }: IDefaultButton) {
  return (
    <div className={styles.holder}>
      <button disabled={disabled} id={id} type={type} className={classNames({
        [className ? className : ""]: true,
        [styles.holder__button]: variant === "default",
        [styles["holder__button--red"]]: variant === "red"
      })} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default memo(DefaultButton);