import logo from "./src/logo_mayer.png"
import styles from "./header.module.scss"
import classNames from "classnames";

function Header() {

  return (
    <header className={classNames(styles.header)}>
      <figure>
        <img
          alt="Logo do Grupo Mayer"
          src={logo}
          className={styles.mayer}
        />
      </figure>
    </header>
  )
}

export default Header