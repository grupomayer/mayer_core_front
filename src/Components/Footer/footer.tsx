import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__text}>
        Grupo Mayer &copy; 2023 - Todos os direitos reservados
      </div>
    </footer>
  )
}

export default Footer;