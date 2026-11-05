import { useEffect, useState } from "react";
import { cachasApi } from "../api/cachasApi";
import { DataResponse } from "../interfaces/pandoraApiResponse";

export const useDataResponse = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ data, setData ] = useState<DataResponse>();
  const urlApi = "http://192.168.178.161:3000/sensors/consultas/data"

  const loadData = async () => {
    setIsLoading(true);
    const response = await pandoraApi.get<DataResponse>(urlApi);
    setData( response.data );
    setIsLoading(false);
  }

  useEffect( () => {
    loadData();
  },[]);

  return { isLoading, data, loadData };

}