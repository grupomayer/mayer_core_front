import DefaultButton from "Components/Inputs/DefaultButton/default_button";
import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import { ServiceDTO } from "DTO/ServiceDTO";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import { Analyst } from "Models/analyst";
import { FormEvent, useEffect, useState } from "react";
import { SelectDataClass } from "Utils/classes";
import { GetDepartmentAnalystsData, PutTransferServiceData } from "./utils/classes";
import { getDepartmentAnalystsRequisition, putTransferServiceRequisition } from "./utils/requisitions";

interface ITransferServiceMenu {
  onClose: Function;
  service: ServiceDTO;
  analyst: Analyst;
}
function TransferServiceMenu({ analyst, service, onClose }: ITransferServiceMenu) {

  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [selectedAnalystId, setSelectedAnalystId] = useState<number>();

  const analysts = useAppSelector(state => [
    new SelectDataClass("", "selecione um analista..."),
    ...state.analysts.map(analyst => new SelectDataClass(analyst.id, analyst.name))
  ]);
  const services = useAppSelector(state => state.services);

  useEffect(() => {
    const getDepartmentAnalystsData = new GetDepartmentAnalystsData(
      dispatch,
      analyst.analystType,
      setLoading,
      setError
    );
    getDepartmentAnalystsRequisition(getDepartmentAnalystsData);
  }, []);

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error])

  useEffect(() => {
    if(loadingTransfer && services.length > 0) {
      alert("Serviço transferido com sucesso!");
      onClose();
    }
  }, [loadingTransfer, services]);

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingTransfer(true);
    const putTransferServicesData = new PutTransferServiceData(
      dispatch,
      auth.userId as number,
      service.id,
      analyst.id as number,
      selectedAnalystId as number,
      setLoadingTransfer,
      setError
    );
    putTransferServiceRequisition(putTransferServicesData);
  }
  
  return (
    <DefaultModal
      size="sm"
      title="Transferir serviço"
      onClose={onClose}
    >
      <form onSubmit={onFormSubmit}>
        <DefaultInput
          id="analyst"
          label="Analista"
          placeholder="Analista"
          title="Analista"
          type="select"
          onChange={setSelectedAnalystId}
          value={selectedAnalystId}
          data={analysts}
        />
        <DefaultButton label="Transferir" type="submit" />
      </form>
      <ShowLoading loading={loading || loadingTransfer} />
      <ShowError error={error} page="TransferServiceMenu" setError={setError} />
    </DefaultModal>
  )
}

export default TransferServiceMenu;