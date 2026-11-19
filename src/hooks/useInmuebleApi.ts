import {useState, useCallback, useEffect} from 'react';
import {cachasApi} from '../api/cachasApi';
import {InmuebleResponse} from '../interfaces/pandoraApiResponse';
import {FormInmuebleData} from './useInmuebleForm';
import { useApiUrl } from './useApiUrl';

interface UseInmuebleApi {
    isLoading: boolean;
    listInmueble: InmuebleResponse[];
    loadInmueble: () => Promise<void>;
    createInmueble: (data: FormInmuebleData) => Promise<void>;
    updateInmueble: (data: FormInmuebleData) => Promise<void>;
    deleteInmueble: (data: FormInmuebleData) => Promise<void>;
}

const buildBody = ({ id_im, ...body }: FormInmuebleData) => body;

export const useInmuebleApi = (): UseInmuebleApi =>{
    const {apiUrl}= useApiUrl();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listInmueble, setListInmueble] = useState<InmuebleResponse[]>([]);
    const urlApi = `${apiUrl}/inmueble`;

    const loadInmueble = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(urlApi);
            if(!response.ok){
                console.log('Error al cargar:', response.status, await response.text());
                return;
            }
            const data: InmuebleResponse[]= await response.json();
            setListInmueble(data);
        } catch (e: any) {
            console.error("Error loading inmueble:", e.message);
        } finally {
            setIsLoading(false);
        }
    },[urlApi]);

    const createInmueble = async (data: FormInmuebleData) => {
        try {
            await cachasApi.post(urlApi, buildBody(data));
        } catch (e: any) {
            console.error('Error al crear:', e.response?.status, e.response?.data ?? e.message);
            throw e;    
        }
    };
    const updateInmueble = async (data: FormInmuebleData) => {
        try {
            await cachasApi.patch(`${urlApi}/${data.id_im}`, buildBody(data));
        } catch (e: any) {
            console.error('Error al actualizar:', e.response?.status, e.response?.data ?? e.message);
        }
    };
    const deleteInmueble = async (data: FormInmuebleData) => {
        try {
            await cachasApi.delete(`${urlApi}/${data.id_im}`);
        } catch (e: any) {
            console.error('Error al eliminar:', e.response?.status, e.response?.data ?? e.message);
        }
    };

    return {
        isLoading,
        listInmueble,
        loadInmueble,
        createInmueble,
        updateInmueble,
        deleteInmueble
    };
};
