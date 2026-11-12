import { useEffect, useState } from 'react';
import { cachasApi } from '../api/cachasApi';
import { EmpleadoDataResponse } from '../interfaces/pandoraApiResponse';

export const useEmpleadoDataResponse = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<EmpleadoDataResponse>();
    const urlApi = "http://192.168.101.13:3000/empleado/consultas/data"

    const loadData = async () => {
        setIsLoading(true);
        const response = await cachasApi.get<EmpleadoDataResponse>(urlApi);
        setData(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    return { isLoading, data, loadData };
}
