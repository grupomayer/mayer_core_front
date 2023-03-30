import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import { FormEvent, useState } from "react";
import styles from "./login.module.scss";
import user from "./src/user.png";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("vamo");
  }

  return (
    <section className={styles.bg}>
      <div className={styles.content}>
        <div className={styles.img}>
          <img
            alt="Ícone de usuário"
            src={user}
          />
        </div>
        <form onSubmit={onFormSubmit} className={styles.form}>
          <h1 className={styles.title}>
            Gestão de acessos
          </h1>
          <DefaultInput
            id="email"
            label="Email"
            placeholder="Email"
            title="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <DefaultInput
            id="password"
            label="Senha"
            placeholder="Senha"
            title="Senha"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <DefaultButton label="Acessar painel" type="submit" />
        </form>
        <div className={styles.down}>
          <div className={styles.link}>
            <Link to="/">
              Recuperar a Senha
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;