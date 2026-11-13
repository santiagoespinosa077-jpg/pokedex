import { useEffect, useState, useCallback} from 'react';
import { cachasApi } from '../api/cachasApi';
import { EmpleadoDataResponse } from '../interfaces/pandoraApiResponse';
import { useApiUrl } from './useApiUrl';

export const useEmpleadoDataResponse = () => {
    const { apiUrl } = useApiUrl();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<EmpleadoDataResponse>();
    const urlApi = "http://192.168.101.13:3000/empleado/consultas/data"

    const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${apiUrl}/empleado/consultas/data`);
      if (!resp.ok) throw new Error(`Error ${resp.status}`);
      const json: EmpleadoDataResponse = await resp.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

    useEffect(() => {
        loadData();
    }, []);

    return { isLoading, data, loadData };
}
