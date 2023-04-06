import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import { useEffect, useState } from "react";
import styles from "./show_confirm_user_delete.module.scss";
import { DeleteUserData } from "./utils/classes";
import { deleteUserRequisition } from "./utils/requisitions";

interface IShowConfirmUserDelete {
  onClose: Function;
  analystId: number;
}
function ShowConfirmUserDelete({ analystId, onClose }: IShowConfirmUserDelete) {

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const auth = useAuth();

  function deleteUser() {
    setLoading(true);
    const deleteUserData = new DeleteUserData(
      dispatch,
      analystId,
      auth.userId as number,
      setDeleted,
      setError
    );
    deleteUserRequisition(deleteUserData)
  }

  useEffect(() => {
    if(deleted) {
      alert("Usuário deletado com sucesso!");
      setDeleted(false);
      setLoading(false);
      onClose();
    }
  }, [deleted, users]);

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error]);

  return (
    <DefaultModal
      onClose={onClose}
      size="sm"
      title="Confirmar?"
    >
      <p>Tem certeza que deseja deletar esse usuário? Essa ação não pode ser desfeita.</p>
      <div className={styles.actions}>
        <div className={styles.action}>
          <DefaultButton label="Cancelar" type="button" onClick={() => onClose()} />
        </div>
        <div className={styles.action}>
          <DefaultButton label="Deletar" type="button" onClick={() => deleteUser()} />
        </div>
      </div>
      <ShowLoading loading={loading} />
      <ShowError error={error} page="ShowUserData" setError={setError} />
    </DefaultModal>
  )
}

export default ShowConfirmUserDelete;