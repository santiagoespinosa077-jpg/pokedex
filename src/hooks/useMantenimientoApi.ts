import { useState } from 'react';
import { cachasApi } from '../api/cachasApi';
import { MantenimientoResponse } from '../interfaces/pandoraApiResponse';
import { FormMantenimientoData } from './useMantenimientoForm';

interface UseMantenimientoApi {
    isLoading: boolean;
    listMantenimiento: MantenimientoResponse[];
    loadMantenimiento: () => Promise<void>;
    createMantenimiento: (data: FormMantenimientoData) => Promise<void>;
    updateMantenimiento: (data: FormMantenimientoData) => Promise<void>;
    deleteMantenimiento: (data: FormMantenimientoData) => Promise<void>;
}

const urlApi = "http://192.168.101.13:3000/mantenimiento";


const buildBody = ({ id_in, ...body }: FormMantenimientoData) => body;

export const useMantenimientoApi = (): UseMantenimientoApi => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listMantenimiento, setListMantenimiento] = useState<MantenimientoResponse[]>([]);

    const loadMantenimiento = async () => {
        setIsLoading(true);
        try {
            const response = await cachasApi.get<MantenimientoResponse[]>(urlApi);
            setListMantenimiento(response.data);
        } catch (e: any) {
            console.error("Error loading mantenimiento:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const createMantenimiento = async (data: FormMantenimientoData) => {
        try {
            await cachasApi.post(urlApi, buildBody(data));
        } catch (e: any) {
            console.error('Error al crear:', e.response?.status, e.response?.data ?? e.message);
            throw e;    
        }
    };

    const updateMantenimiento = async (data: FormMantenimientoData) => {
        try {
            await cachasApi.patch(`${urlApi}/${data.id_in}`, buildBody(data));
        } catch (e: any) {
            console.error('Error al actualizar:', e.response?.status, e.response?.data ?? e.message);
        }
    };

    const deleteMantenimiento = async (data: FormMantenimientoData) => {
        try {
            await cachasApi.delete(`${urlApi}/${data.id_in}`);
        } catch (e: any) {
            console.error('Error al eliminar:', e.response?.status, e.response?.data ?? e.message);
        }
    };

    return {
        isLoading,
        listMantenimiento,
        loadMantenimiento,
        createMantenimiento,
        updateMantenimiento,
        deleteMantenimiento,
    };
};