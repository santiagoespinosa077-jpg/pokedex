import {useState} from 'react';
import {cachasApi} from '../api/cachasApi';
import {InmuebleResponse} from '../interfaces/pandoraApiResponse';
import {FormInmuebleData} from './useInmuebleForm';

interface UseInmuebleApi {
    isLoading: boolean;
    listInmueble: InmuebleResponse[];
    loadInmueble: () => Promise<void>;
    createInmueble: (data: FormInmuebleData) => Promise<void>;
    updateInmueble: (data: FormInmuebleData) => Promise<void>;
    deleteInmueble: (data: FormInmuebleData) => Promise<void>;
}
const urlApi = "http://192.168.101.13:3000/inmueble";

const buildBody = ({ id_im, ...body }: FormInmuebleData) => body;

export const useInmuebleApi = (): UseInmuebleApi =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listInmueble, setListInmueble] = useState<InmuebleResponse[]>([]);
    
    const loadInmueble = async () => {
        setIsLoading(true);
        try {
            const response = await cachasApi.get<InmuebleResponse[]>(urlApi);
            setListInmueble(response.data);
        } catch (e: any) {
            console.error("Error loading inmueble:", e);
        } finally {
            setIsLoading(false);
        }
    };

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
