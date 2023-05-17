import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import { FormEvent, useEffect, useState } from "react";
import styles from "./login.module.scss";
import user from "./src/user.png";
import { Link, useNavigate } from "react-router-dom";
import { PostAuthenticationData } from "./utils/classes";
import { postAuthenticationRequisition } from "./utils/requisitions";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import ShowError from "Components/Modals/ShowError/show_error";
import { useAuth } from "Hooks/useAuth/use_auth";
import logoImg from "Images/mayer_tech.png";

function Login() {

  const dispatch = useAppDispatch();
  const authenticatedData = useAppSelector(state => state.authentication);
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const postAuthenticationData = new PostAuthenticationData(
      dispatch,
      email,
      password,
      setLoading,
      setError
    );
    postAuthenticationRequisition(postAuthenticationData);
  }

  useEffect(() => {
    if(loading && authenticatedData.token) {
      auth.authenticate(authenticatedData.token, authenticatedData.data.id);
      navigate("/users/", { replace: true });
      setLoading(false);
    }
  }, [authenticatedData, loading])

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error])

  return (
    <section className={styles.bg}>
      <div className={styles.left}>
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
      <div className={styles.right}>
        <img
          src={logoImg}
          alt="Logo da empresa Grupo Mayer, em branco"
          className={styles.logo}
        />
      </div>
      <ShowLoading loading={loading} />
      <ShowError error={error} page="Login" setError={setError} />
    </section>
  )
}

export default Login;