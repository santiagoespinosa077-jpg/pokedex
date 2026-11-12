import { useEffect, useState } from 'react';
import { cachasApi } from '../api/cachasApi';
import { CalificacionDataResponse } from '../interfaces/pandoraApiResponse';

export const useCalificacionDataResponse = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<CalificacionDataResponse>();
    const urlApi = "http://192.168.101.13:3000/calificacion/consultas/data"

    const loadData = async () => {
        setIsLoading(true);
        const response = await cachasApi.get<CalificacionDataResponse>(urlApi);
        setData(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    return { isLoading, data, loadData };
}
