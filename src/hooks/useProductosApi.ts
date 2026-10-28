import { useState } from 'react';
import { cachasApi} from '../api/cachasApi';
import { ProductosResponse } from '../interfaces/pandoraApiResponse';
import type { FormProductoData } from './useProductoForm';

interface UseProductosApi {
  isLoading:      boolean;
  listProducto:   ProductosResponse[];
  loadProducto:   () => Promise<void>;
  createProducto: (data: FormProductoData) => Promise<boolean>;
  updateProducto: (data: FormProductoData) => Promise<boolean>;
  deleteProducto: (data: FormProductoData) => Promise<boolean>;
}

export const useProductosApi =():UseProductosApi=>{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listProducto,setListProducto]=useState<ProductosResponse[]>([]);
  const urlApi= "http://192.168.101.13:3000/producto";

const loadProducto = async()=>{
  setIsLoading(true);
  try {
      const response = await cachasApi.get<ProductosResponse[]>(urlApi);
      setListProducto( response.data );
    } catch (e: any) {
      console.log('Error al cargar:', e.response?.status, e.response?.data ?? e.message);
    } finally {
      setIsLoading(false);
    }
}

  const createProducto = async ( data: FormProductoData ) => {
    const dataBody = {
      sku: data.sku,
      nombre_producto: data.nombre_producto,
      categoria: data.categoria, 
      marca: data.marca,
      precio: data.precio,
      existencias: data.existencias,
      descripcion: data.descripcion,
      provedor: data.provedor,
      estado:      data.estado,
      imagen: data.imagen
    }
    try {
      await cachasApi.post( urlApi, dataBody );
    } catch (e: any) {
      console.log('Error al crear:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  const updateProducto = async ( data: FormProductoData ) => {
    const dataBody = {
      sku: data.sku,
      nombre_producto: data.nombre_producto,
      categoria: data.categoria, 
      marca: data.marca,
      precio: data.precio,
      existencias: data.existencias,
      descripcion: data.descripcion,
      provedor: data.provedor,
      estado:      data.estado,
      imagen: data.imagen
    }
    try {
      await cachasApi.patch( `${urlApi}/${data.id_producto}`, dataBody );
    } catch (e: any) {
      console.log('Error al actualizar:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  const deleteProducto = async ( data: FormProductoData ) => {
    try {
      await cachasApi.delete( `${urlApi}/${data.id_producto}` );
    } catch (e: any) {
      console.log('Error al eliminar:', e.response?.status, e.response?.data ?? e.message);
    }
  }

  return { isLoading, listProducto, loadProducto, createProducto, updateProducto, deleteProducto };
}
