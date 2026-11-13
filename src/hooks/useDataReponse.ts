import { useEffect, useState, useCallback } from "react";
import { cachasApi } from "../api/cachasApi";
import { DataResponse } from "../interfaces/pandoraApiResponse";
import { useApiUrl } from "./useApiUrl";

export const useDataResponse = () => {
  const {apiUrl} = useApiUrl();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ data, setData ] = useState<DataResponse>();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${apiUrl}/sensor/consultas/data`);
      if (!resp.ok) throw new Error(`Error ${resp.status}`);
      const json: DataResponse = await resp.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect( () => {
    loadData();
  },[]);

  return { isLoading, data, loadData };

}