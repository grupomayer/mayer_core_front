import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import Table from "Components/Table/table";
import { createButton } from "Components/Table/table_components";
import { Line } from "Components/Table/utils/classes";
import { UserDTO } from "DTO/UserDTO";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import { FormEvent, useEffect, useState } from "react";
import ShowUserData from "./Components/ShowUserData/show_user_data";
import { GetUsersData } from "./utils/classes";
import { getUsersRequisition } from "./utils/requisitions";
import styles from "./users.module.scss";

function Users() {

  const dispatch = useAppDispatch();
  
  const usersLines = useAppSelector(state => state.users.map(user => new Line(
    undefined,
    undefined,
    undefined,
    user.name,
    user.email,
    user.department,
    user.branch,
    createButton(() => setOpenUser(user))
  )));

  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [openUser, setOpenUser] = useState<UserDTO>();
  const [error, setError] = useState<number | null>(null);
  const titles = ["Nome", "Email", "Departamento", "Filial", "Mais informações"];

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const getUsersData = new GetUsersData(
      dispatch,
      auth.userId as number,
      setUpdated,
      setError
    );
    getUsersRequisition(getUsersData);
  }

  useEffect(() => {
    if(updated && loading && usersLines.length > 0) {
      setLoading(false);
      setUpdated(false);
    }
  }, [usersLines])

  return (
    <section>
      <h1>Buscar usuários</h1>
      <form onSubmit={onFormSubmit} className={styles.search}>
        <DefaultButton label="Buscar" type="submit" />
      </form>
      <Table
        titles={titles}
        lines={usersLines}        
      />
      {openUser && <ShowUserData user={openUser} onClose={() => setOpenUser(undefined)} />}
      <ShowLoading loading={loading} />
      <ShowError error={error} page="Users" setError={setError} />
    </section>
  )
}

export default Users;