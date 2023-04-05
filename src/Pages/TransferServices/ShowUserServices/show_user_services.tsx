import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import { useAppDispatch } from "Hooks/useRedux/use_redux";
import { Analyst } from "Models/analyst";
import { useEffect, useState } from "react";
import { GetUserServicesData } from "./utils/classes";
import { getUserServicesRequisition } from "./utils/requisitions";

interface IShowUserServices {
  onClose: Function;
  user: Analyst;
}
export function ShowUserServices({ onClose, user }: IShowUserServices) {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<number | null>(null);

  useEffect(() => {
    if(loading) {
      const getUserServicesData = new GetUserServicesData(
        dispatch,
        user.id as number,
        setLoading,
        setError
      )
      getUserServicesRequisition(getUserServicesData);
    }
  }, [])

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error])

  return (
    <DefaultModal
      onClose={onClose}
      size="sm"
      title="Serviços do usuário"
    >

      <ShowLoading loading={loading} />
      <ShowError error={error} page="ShowUserServices" setError={setError} />
    </DefaultModal>
  )
}

export default ShowUserServices;