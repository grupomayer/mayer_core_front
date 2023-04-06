import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import { DefaultInputData } from "Components/Inputs/DefaultInput/utils/classes";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import { UserDTO } from "DTO/UserDTO";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch } from "Hooks/useRedux/use_redux";
import { FormEvent, useEffect, useState } from "react";
import styles from "./show_user_permissions.module.scss";
import { PermissionsData, PutPermissionsData } from "./utils/classes";
import { putPermissionsRequisition } from "./utils/requisitions";

interface IShowUserPermissions {
  onClose: Function;
  user: UserDTO;
}
function ShowUserPermissions({ onClose, user }: IShowUserPermissions) {

  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);

  const [isCoordinator, setIsCoordinator] = useState<boolean>(user.is_coordinator);
  const [isAnalyst, setIsAnalyst] = useState<boolean>(user.is_analyst);
  const [isSuperUser, setIsSuperUser] = useState<boolean>(user.is_superuser);
  const [isAdmin, setIsAdmin] = useState<boolean>(user.is_admin);
  const [isFinancial, setIsFinancial] = useState<boolean>(user.is_financial);
  const [isExecutiveBoard, setIsExecutiveBoard] = useState<boolean>(user.is_executive_board);
  const [isLegalArchitecture, setIsLegalArchitecture] = useState<boolean>(user.is_legal_architecture);
  const [isPublicity, setIsPublicity] = useState<boolean>(user.is_publicity);
  const [isEvtl, setIsEvtl] = useState<boolean>(user.is_evtl);
  const [isFireFighting, setIsFireFighting] = useState<boolean>(user.is_fire_fighting);
  const [isLicensing, setIsLicensing] = useState<boolean>(user.is_licensing);
  const [isWealthManagement, setIsWealthManagement] = useState<boolean>(user.is_wealth_management);
  const [isRegisterCorporate, setIsRegisterCorporate] = useState<boolean>(user.is_register_corporate);
  const [isAvcb, setIsAvcb] = useState<boolean>(user.is_avcb);

  const permissionsInputs = [
    new DefaultInputData(isCoordinator, setIsCoordinator, "is_coordinator", "checkbox", "Coordenador", "Coordenador", "Coordenador", undefined, false),
    new DefaultInputData(isAnalyst, setIsAnalyst, "is_analyst", "checkbox", "Analista", "Analista", "Analista", undefined, false),
    new DefaultInputData(isSuperUser, setIsSuperUser, "is_superuser", "checkbox", "Super usuário", "Super usuário", "Super usuário", undefined, false),
    new DefaultInputData(isAdmin, setIsAdmin, "is_admin", "checkbox", "Administrativo", "Administrativo", "Administrativo", undefined, false),
    new DefaultInputData(isFinancial, setIsFinancial, "is_financial", "checkbox", "Financeiro", "Financeiro", "Financeiro", undefined, false),
    new DefaultInputData(isExecutiveBoard, setIsExecutiveBoard, "is_executive_board", "checkbox", "Diretoria", "Diretoria", "Diretoria", undefined, false),
    new DefaultInputData(isLegalArchitecture, setIsLegalArchitecture, "is_legal_architecture", "checkbox", "Arquitetura", "Arquitetura", "Arquitetura", undefined, false),
    new DefaultInputData(isPublicity, setIsPublicity, "is_publicity", "checkbox", "Publicidade", "Publicidade", "Publicidade", undefined, false),
    new DefaultInputData(isEvtl, setIsEvtl, "is_evtl", "checkbox", "EVTL", "EVTL", "EVTL", undefined, false),
    new DefaultInputData(isFireFighting, setIsFireFighting, "is_fire_fighting", "checkbox", "Incêndio", "Incêndio", "Incêndio", undefined, false),
    new DefaultInputData(isLicensing, setIsLicensing, "is_licensing", "checkbox", "Licenciamento", "Licenciamento", "Licenciamento", undefined, false),
    new DefaultInputData(isWealthManagement, setIsWealthManagement, "is_wealth_management", "checkbox", "Gestão Patrimonial", "Gestão Patrimonial,", "Gestão Patrimonial", undefined, false),
    new DefaultInputData(isRegisterCorporate, setIsRegisterCorporate, "is_register_corporate", "checkbox", "Registrário", "Registrário", "Registrário", undefined, false),
    new DefaultInputData(isAvcb, setIsAvcb, "is_avcb", "checkbox", "AVCB", "AVCB", "AVCB", undefined, false),
  ];

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const permissions = new PermissionsData(
      user.id,
      isAdmin,
      isFinancial,
      isExecutiveBoard,
      isLegalArchitecture,
      isPublicity,
      isEvtl,
      isFireFighting,
      isLicensing,
      isWealthManagement,
      isCoordinator,
      isAnalyst,
      isRegisterCorporate,
      isSuperUser,
      isAvcb,
      auth.userId as number,
    );
    const putPermissionsData = new PutPermissionsData(
      dispatch,
      permissions,
      setUpdated,
      setError
    );
    putPermissionsRequisition(putPermissionsData);
  }

  useEffect(() => {
    if(loading && updated) {
      setLoading(false);
      setUpdated(false);
      alert("Permissões atualizadas com sucesso!");
      onClose();
    }
  }, [loading, updated])

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error])

  return (
    <DefaultModal
      onClose={onClose}
      size="sm"
      title="Permissões"
    >
      <form onSubmit={onFormSubmit}>
        <div className={styles.permissions}>
          {permissionsInputs.map(({ className, data, disabled, id, label, max, min, onChange, placeholder, required, title, type, value }) => (
            <div className={styles.permission}>
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
            </div>
          ))}
        </div>
        <DefaultButton label="Atualizar" type="submit" />
      </form>
      <ShowLoading loading={loading} />
      <ShowError error={error} page="ShowUserPermissions" setError={setError} />
    </DefaultModal>
  )
}

export default ShowUserPermissions;