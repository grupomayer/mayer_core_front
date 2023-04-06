import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import { DefaultInputData } from "Components/Inputs/DefaultInput/utils/classes";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import { Analyst } from "Models/analyst";
import { FormEvent, useEffect, useState } from "react";
import { branchs, departments } from "Utils/datas";
import { PostUserData } from "./utils/classes";
import { analystTypes } from "./utils/data";
import { postUserRequisition } from "./utils/requisitions";

function RegisterUser() {

  const users = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [department, setDepartment] = useState<string>(departments[0].value);
  const [phone, setPhone] = useState<string>("");
  const [branch, setBranch] = useState<string>(branchs[0].value);
  const auth = useAuth();

  const inputs = [
    new DefaultInputData(name, setName, "user_name", "text", "Nome", "Nome", "Nome"),
    new DefaultInputData(email, setEmail, "user_email", "email", "Email", "Email", "Email"),
    new DefaultInputData(password, setPassword, "user_password", "password", "Senha", "Senha", "Senha"),
    new DefaultInputData(cpf, setCpf, "user_cpf", "number", "CPF", "CPF", "CPF"),
    new DefaultInputData(phone, setPhone, "user_phone", "number", "Telefone", "Telefone", "Telefone"),
    new DefaultInputData(department, setDepartment, "user_department", "select", "Departamento", "Departamento", "Departamento", departments),
    new DefaultInputData(branch, setBranch, "user_branch", "select", "Filial", "Filial", "Filial", branchs),
  ];

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const analyst = new Analyst(
      name,
      department,
      branch,
      phone,
      email,
      password,
      analystTypes.find(type => type.label === department)?.value,
      cpf,
    );
    const postUserData = new PostUserData(
      dispatch,
      analyst,
      auth.userId as number,
      setLoading,
      setError
    );
    postUserRequisition(postUserData);
  }

  function resetInputs() {
    setName("");
    setDepartment("");
    setBranch("");
    setPhone("");
    setEmail("");
    setPassword("");
    setCpf("");
  }

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error])

  useEffect(() => {
    if(users.length > 0 && loading) {
      setLoading(false);
      resetInputs();
      alert("Usuário cadastrado com sucesso!");
    }
  }, [users, loading])

  return (
    <section>
      <h1>Cadastrar usuário</h1>
      <form onSubmit={onFormSubmit}>
        {inputs.map(({ className, data, disabled, id, label, max, min, onChange, placeholder, required, title, type, value }) => (<DefaultInput
          key={id}
          id={id}
          label={label}
          onChange={onChange}
          placeholder={placeholder}
          title={title}
          type={type}
          value={value}
          data={data}
          className={className}
          disabled={disabled}
          max={max}
          min={min}
          required={required}
        />))}
        <DefaultButton label="Cadastrar" type="submit" />
      </form>
      <ShowLoading loading={loading} />
      <ShowError error={error} page="RegisterUser" setError={setError} />
    </section>
  )
}

export default RegisterUser;