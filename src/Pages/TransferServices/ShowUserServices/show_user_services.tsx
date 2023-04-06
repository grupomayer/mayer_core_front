import DefaultInput from "Components/Inputs/DefaultInput/default_input";
import DefaultModal from "Components/Modals/DefaultModal/default_modal";
import ShowError from "Components/Modals/ShowError/show_error";
import ShowLoading from "Components/Modals/ShowLoading/show_loading";
import Table from "Components/Table/table";
import { createButton } from "Components/Table/table_components";
import { Line } from "Components/Table/utils/classes";
import { ServiceDTO } from "DTO/ServiceDTO";
import { useAuth } from "Hooks/useAuth/use_auth";
import { useAppDispatch, useAppSelector } from "Hooks/useRedux/use_redux";
import { Analyst } from "Models/analyst";
import { useEffect, useState } from "react";
import { formatDate } from "Utils/formatters";
import { GetUserServicesData } from "./utils/classes";
import { getUserServicesRequisition } from "./utils/requisitions";
import styles from "./show_user_services.module.scss";
import TransferServiceMenu from "./Components/TransferServiceMenu/transfer_service_menu";

interface IShowUserServices {
  onClose: Function;
  user: Analyst;
}
export function ShowUserServices({ onClose, user }: IShowUserServices) {

  const dispatch = useAppDispatch();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [updated, setUpdated] = useState<boolean>(false);
  const [error, setError] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDTO>();
  const [finishedFilter, setFinishedFilter] = useState<boolean>(false);

  const titles = ["Cliente", "Filial", "Tipo de solicitação", "Data da solicitação", "Local de atendimento", "Transferir"];
  const services = useAppSelector(state => state.services.filter(service => service.finished === finishedFilter).map(service => new Line(
    undefined,
    undefined,
    undefined,
    service.client,
    service.branch,
    service.solicitation_type,
    formatDate(new Date(service.solicitation_date)),
    `${service.state.state_name} - ${service.county.county_name}`,
    createButton(() => setSelectedService(service))
  )));

  useEffect(() => {
    if(loading) {
      const getUserServicesData = new GetUserServicesData(
        dispatch,
        user.id as number,
        auth.userId as number,
        setUpdated,
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

  useEffect(() => {
    if(loading && updated) {
      setLoading(false);
    }
  }, [services, updated])

  return (
    <DefaultModal
      onClose={onClose}
      size="xl"
      title={`Serviços de '${user.name}'`}
    >
      {!loading && (
        <>
          <div className={styles.filters}>
            <h2>
              Filtros:
            </h2>
            <DefaultInput
              type="checkbox"
              id="finished"
              label="Serviço finalizado"
              placeholder="Serviço finalizado"
              title="Serviço finalizado"
              value={finishedFilter}
              onChange={setFinishedFilter}
            />
          </div>
          <Table
            titles={titles}
            lines={services}
          />
        </>
      )}
      {selectedService && <TransferServiceMenu 
        onClose={() => setSelectedService(undefined)}
        service={selectedService}
        analyst={user}
      />}
      <ShowLoading loading={loading} />
      <ShowError error={error} page="ShowUserServices" setError={setError} />
    </DefaultModal>
  )
}

export default ShowUserServices;