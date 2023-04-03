import styles from "./header.module.scss"
import classNames from "classnames";

function Header() {

  return (
    <header className={classNames(styles.header)}>
      <h1 className={styles.title}>
        Gestão de acessos
      </h1>
    </header>
  )
}

export default Header