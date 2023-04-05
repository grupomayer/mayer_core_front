import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
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
  const [error, setError] = useState<number | null>(null);
  const auth = useAuth();

  function deleteUser() {
    const deleteUserData = new DeleteUserData(
      dispatch,
      analystId,
      auth.userId as number,
      setLoading,
      setError
    );
    deleteUserRequisition(deleteUserData)
  }

  useEffect(() => {
    if(loading && users.length > 0) {
      alert("Usuário deletado com sucesso!");
      onClose();
    }
  }, [users, loading]);

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
    </DefaultModal>
  )
}

export default ShowConfirmUserDelete;