import { useState } from 'react';
import { cachasApi } from '../api/cachasApi';
import { TareaResponse } from '../interfaces/pandoraApiResponse';
import { FormTareaData } from './useTareaForm';

interface UseTareaApi {
  isLoading:   boolean;
  listTarea:   TareaResponse[];
  loadTarea:   () => Promise<void>;
  createTarea: (data: FormTareaData) => Promise<void>;
  updateTarea: (data: FormTareaData) => Promise<void>;
  deleteTarea: (data: FormTareaData) => Promise<void>;
}

export const useTareaApi = (): UseTareaApi => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listTarea, setListTarea ] = useState<TareaResponse[]>([]);
  const urlApi = "http://192.168.101.13:3000/tarea";

  const loadTarea = async () => {
    setIsLoading(true);
    try {
      const response = await cachasApi.get<TareaResponse[]>(urlApi);
      setListTarea( response.data );
    } catch (e: any) {
      console.log('Error al cargar:', e.response?.status, e.response?.data ?? e.message);
    } finally {
      setIsLoading(false);
    }
  }

  const createTarea = async ( data: FormTareaData ) => {
    const dataBody = {
      titulo:      data.titulo,
      descripcion: data.descripcion,
      estado:      data.estado
    }
    try {
      await cachasApi.post( urlApi, dataBody );
    } catch (e: any) {
      console.log('Error al crear:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  const updateTarea = async ( data: FormTareaData ) => {
    const dataBody = {
      titulo:      data.titulo,
      descripcion: data.descripcion,
      estado:      data.estado
    }
    try {
      await cachasApi.patch( `${urlApi}/${data.id_tarea}`, dataBody );
    } catch (e: any) {
      console.log('Error al actualizar:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  const deleteTarea = async ( data: FormTareaData ) => {
    try {
      await cachasApi.delete( `${urlApi}/${data.id_tarea}` );
    } catch (e: any) {
      console.log('Error al eliminar:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  return { isLoading, listTarea, loadTarea, createTarea, updateTarea, deleteTarea };
}