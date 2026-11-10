import { useEffect, useState } from "react";
import { cachasApi } from "../api/cachasApi";
import { ClienteDataResponse } from "../interfaces/pandoraApiResponse";

export const useClienteDataResponse = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ data, setData ] = useState<ClienteDataResponse>();
  const urlApi = "http://192.168.101.13:3000/cliente/consultas/data"

  const loadData = async () => {
    setIsLoading(true);
    const response = await cachasApi.get<ClienteDataResponse>(urlApi);
    setData( response.data );
    setIsLoading(false);
  }

  useEffect( () => {
    loadData();
  },[]);

  return { isLoading, data, loadData };

}