import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import Table from "Components/Table/table";
import { Line } from "Components/Table/utils/classes";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import { FormEvent, useEffect, useState } from "react";
import { departments } from "Utils/datas";
import { GetUsersData } from "./utils/classes";
import { getUsersRequisition } from "./utils/requisitions";

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
    user.phone
  )));

  const auth = useAuth();
  const [department, setDepartment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const titles = ["Nome", "Email", "Departamento", "Filial", "Telefone"];

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const getUsersData = new GetUsersData(
      dispatch,
      department,
      auth.userId as number,
      setLoading,
      setError
    );
    getUsersRequisition(getUsersData);
  }

  useEffect(() => {
    if(usersLines.length > 0 && loading) {
      setLoading(false);
    }
  }, [usersLines, loading])

  return (
    <section>
      <h1>Buscar usuários</h1>
      <form onSubmit={onFormSubmit}>
        <DefaultInput
          value={department}
          onChange={setDepartment}
          id="department"
          label="Departamento"
          placeholder="Departamento"
          title="Departamento"
          type="select"
          data={departments}
        />
        <DefaultButton label="Buscar" type="submit" />
      </form>
      <Table
        titles={titles}
        lines={usersLines}        
      />
      <ShowLoading loading={loading} />
      <ShowError error={error} page="Users" setError={setError} />
    </section>
  )
}

export default Users;