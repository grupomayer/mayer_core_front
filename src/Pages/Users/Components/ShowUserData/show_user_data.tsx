import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import styles from "./show_user_data.module.scss";
import { DefaultInputData } from "Components/Inputs/DefaultInput/utils/classes";
import { Analyst } from "Models/analyst";
import { FormEvent, useState } from "react";
import { branchs, departments } from "Utils/datas";
import userImg from "Images/user.png";
import ShowUserPermissions from "./Components/ShowUserPermissions/show_user_permissions";
import { PutUserData } from "./utils/classes";
import { useAppDispatch } from "Hooks/useRedux/use_redux";
import { putUserRequisition } from "./utils/requisitions";
import ShowConfirmUserDelete from "./Components/ShowConfirmUserDelete/show_confirm_user_delete";
import { UserDTO } from "DTO/UserDTO";
import { analystTypes } from "Pages/RegisterUsers/utils/data";

interface IShowUserData {
  onClose: Function;
  user: UserDTO;
}
function ShowUserData({ onClose, user }: IShowUserData) {

  const analyst = new Analyst(
    user.name,
    user.department,
    user.branch,
    user.phone,
    user.email,
    "",
    analystTypes.find(type => type.label === user.department)?.value,
    user.cpf,
    user.id  
  );

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [name, setName] = useState<string>(analyst.name);
  const [email, setEmail] = useState<string>(analyst.email);
  const [cpf, setCpf] = useState<string>(analyst.cpf);
  const [phone, setPhone] = useState<string>(analyst.phone);
  const [department, setDepartment] = useState<string>(analyst.department);
  const [branch, setBranch] = useState<string>(analyst.branch);
  const [openPermissions, setOpenPermissions] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const inputs = [
    new DefaultInputData(name, setName, "analyst_name", "text", "Nome", "Nome", "Nome", undefined),
    new DefaultInputData(email, setEmail, "analyst_email", "email", "Email", "Email", "Email", undefined),
    new DefaultInputData(cpf, setCpf, "analyst_cpf", "number", "CPF", "CPF", "CPF", undefined),
    new DefaultInputData(phone, setPhone, "analyst_phone", "number", "Telefone", "Telefone", "Telefone", undefined),
    new DefaultInputData(department, setDepartment, "analyst_department", "select", "Departamento", "Departamento", "Departamento", departments),
    new DefaultInputData(branch, setBranch, "analyst_branch", "select", "Filial", "Filial", "Filial", branchs),
  ];

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAnalyst = new Analyst(
      name,
      department,
      branch,
      phone,
      email,
      "",
      "",
      cpf,
      analyst.id as number,
    );
    const putUserData = new PutUserData(
      dispatch,
      newAnalyst,
      setLoading,
      setError
    );
    putUserRequisition(putUserData);
  }

  return (
    <DefaultModal
      onClose={onClose}
      size="sm"
      title="Usuário"
    >
      <div className={styles.user}>
        <div className={styles.profile}>
          <img
            alt="Ícone de usuário"
            src={userImg}
          />
        </div>
        <div className={styles.actions}>
          <DefaultButton label="Permissões" type="button" onClick={() => setOpenPermissions(true)} />
          <DefaultButton label="Excluir usuário" type="button" onClick={() => setShowDelete(true)} />
        </div>
      </div>
      <form onSubmit={onFormSubmit}>
        {inputs.map(({ className, data, disabled, id, label, max, min, onChange, placeholder, required, title, type, value }) => (
          <DefaultInput
            id={id}
            className={className}
            data={data}
            disabled={disabled}
            label={label}
            max={max}
            min={min}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            title={title}
            type={type}
            value={value}
          />
        ))}
        <DefaultButton label="Atualizar" type="submit" />
      </form>
      {showDelete && <ShowConfirmUserDelete analystId={analyst.id as number} onClose={() => setShowDelete(false)} />}
      {openPermissions && <ShowUserPermissions user={user} onClose={() => setOpenPermissions(false)} />}
    </DefaultModal>
  )
}

export default ShowUserData;