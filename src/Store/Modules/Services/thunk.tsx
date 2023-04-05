import { createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceDTO } from "DTO/ServiceDTO";
import { httpProvider } from "Http/http";
import { PutTransferServiceData } from "Pages/TransferServices/ShowUserServices/Components/TransferServiceMenu/utils/classes";
import { GetUserServicesData } from "Pages/TransferServices/ShowUserServices/utils/classes";
import { getServices, putTransferServices } from "./reducer";

type Url = {
    id: number,
    prestige_url: string | undefined,
    not_generated_url_for: null | undefined
};

function createServices(services: Array<ServiceDTO>, urls: Array<Url>): Array<ServiceDTO> {
    return services.map(service => ({
        ...service,
        evidential_document_prestige: urls.find(url => url.id === service.id)?.prestige_url as string
    }))
}

export function getUserServicesThunk({ analystId, userId, dispatch, setError, setLoading }: GetUserServicesData) {
    const thunk = createAsyncThunk(
        "services/GET",
        async () => {
            httpProvider.get(`/service-transfer/${analystId}/${userId}/`)
                .then(response => {
                    setLoading(true);
                    const responseData = createServices(response.data.data, response.data.urls);
                    console.log(responseData);
                    dispatch(getServices(responseData));
                })
                .catch(error => {
                    setError(error.response.status);
                    dispatch(getServices([]));
                })
        }
    )
    return thunk();
}

export function putTransferServiceThunk({ dispatch, serviceId, setError, setLoading, newAnalystId, secondAnalystId, userId }: PutTransferServiceData) {
    const thunk = createAsyncThunk(
      "@serviceTransferAction/PUT",
      async () => {
  
        httpProvider.put("/service-transfer-admin/", {
          "service_id": serviceId,
          "new_analyst_id": newAnalystId,
          "second_analyst_id": secondAnalystId,
          "admin_id": userId
        })
          .then(() => {
            setLoading(true);
            dispatch(putTransferServices(serviceId));
          })
          .catch(error => {
            setError(error.response.status);
          })
      }
    );
  
    return thunk();
  }