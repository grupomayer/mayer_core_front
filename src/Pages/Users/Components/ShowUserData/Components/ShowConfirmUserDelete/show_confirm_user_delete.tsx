import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch } from "Hooks/useRedux/use_redux";
import { useState } from "react";
import styles from "./show_confirm_user_delete.module.scss";
import { DeleteUserData } from "./utils/classes";
import { deleteUserRequisition } from "./utils/requisitions";

interface IShowConfirmUserDelete {
  onClose: Function;
  analystId: number;
}
function ShowConfirmUserDelete({ analystId, onClose }: IShowConfirmUserDelete) {

  const dispatch = useAppDispatch();
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