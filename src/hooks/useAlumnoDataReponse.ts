import { useEffect, useState } from "react";
import { cachasApi } from "../api/cachasApi";
import { AlumnoDataResponse } from "../interfaces/pandoraApiResponse";

export const useAlumnoDataResponse = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ data, setData ] = useState<AlumnoDataResponse>();
  const urlApi = "http://192.168.101.13:3000/alumno/consultas/data"

  const loadData = async () => {
    setIsLoading(true);
    const response = await cachasApi.get<AlumnoDataResponse>(urlApi);
    setData( response.data );
    setIsLoading(false);
  }

  useEffect( () => {
    loadData();
  },[]);

  return { isLoading, data, loadData };

}