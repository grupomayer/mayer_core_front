import logo from "./src/logo_mayer.png"
import styles from "./header.module.scss"
import classNames from "classnames";
import { useAuth } from "Hooks/useAuth/use_auth";

function Header() {

  const auth = useAuth();

  return (
    <header className={classNames(styles.header)}>
      {!auth.isAuthenticated() ? (
        <figure>
          <img
            alt="Logo do Grupo Mayer"
            src={logo}
            className={styles.mayer}
          />
        </figure>
      ) : (
        <h1 className={styles.title}>
          Gestão de acessos
        </h1>
      )}
    </header>
  )
}

export default Header