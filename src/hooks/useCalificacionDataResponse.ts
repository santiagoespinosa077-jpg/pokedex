import { useEffect, useState, useCallback} from 'react';
import { cachasApi } from '../api/cachasApi';
import { CalificacionDataResponse } from '../interfaces/pandoraApiResponse';
import { useApiUrl } from './useApiUrl';

export const useCalificacionDataResponse = () => {
    const { apiUrl } = useApiUrl();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<CalificacionDataResponse>();
    

    const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${apiUrl}/calificacion/consultas/data`);
      if (!resp.ok) throw new Error(`Error ${resp.status}`);
      const json: CalificacionDataResponse = await resp.json();
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
