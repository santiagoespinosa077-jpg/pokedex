import { useState } from 'react';
import { cachasApi } from '../api/cachasApi';
import { BecaResponse } from '../interfaces/pandoraApiResponse';
import { FormBecaData } from './useBecaForm';

interface UseBecaApi {
  isLoading:  boolean;
  listBeca:   BecaResponse[];
  loadBeca:   () => Promise<void>;
  createBeca: (data: FormBecaData) => Promise<void>;
  updateBeca: (data: FormBecaData) => Promise<void>;
  deleteBeca: (data: FormBecaData) => Promise<void>;
}

export const useBecaApi = (): UseBecaApi => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listBeca, setListBeca ] = useState<BecaResponse[]>([]);
  const urlApi = "http://192.168.101.13:3000/beca";

  const loadBeca = async () => {
    setIsLoading(true);
    try {
      const response = await cachasApi.get<BecaResponse[]>(urlApi);
      setListBeca( response.data );
    } catch (e: any) {
      console.log('Error al cargar:', e.response?.status, e.response?.data ?? e.message);
    } finally {
      setIsLoading(false);
    }
  }

  const createBeca = async ( data: FormBecaData ) => {
    const dataBody = {
      nombre:        data.nombre,
      matricula:     data.matricula,
      carrera:       data.carrera,
      promedio:      data.promedio,
      semestre:      data.semestre,
      email:         data.email,
      telefono:      data.telefono,
      justificacion: data.justificacion,
      documentacion: data.documentacion,
      tipo:          data.tipo,
      imagen1:       data.imagen1,
      imagen2:       data.imagen2,
      imagen3:       data.imagen3,
      imagen4:       data.imagen4
    }
    try {
      await cachasApi.post( urlApi, dataBody );
    } catch (e: any) {
      console.log('Error al crear:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  const updateBeca = async ( data: FormBecaData ) => {
    const dataBody = {
      nombre:        data.nombre,
      matricula:     data.matricula,
      carrera:       data.carrera,
      promedio:      data.promedio,
      semestre:      data.semestre,
      email:         data.email,
      telefono:      data.telefono,
      justificacion: data.justificacion,
      documentacion: data.documentacion,
      tipo:          data.tipo,
      imagen1:       data.imagen1,
      imagen2:       data.imagen2,
      imagen3:       data.imagen3,
      imagen4:       data.imagen4
    }
    try {
      await cachasApi.patch( `${urlApi}/${data.id_beca}`, dataBody );
    } catch (e: any) {
      console.log('Error al actualizar:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  const deleteBeca = async ( data: FormBecaData ) => {
    try {
      await cachasApi.delete( `${urlApi}/${data.id_beca}` );
    } catch (e: any) {
      console.log('Error al eliminar:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  return { isLoading, listBeca, loadBeca, createBeca, updateBeca, deleteBeca };
}