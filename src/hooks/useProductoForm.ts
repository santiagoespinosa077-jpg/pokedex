import { useReducer } from "react";
import { useProductosApi } from "./useProductosApi";
import { EstadoProducto } from "../interfaces/pandoraApiResponse";

export interface FormProductoData {
  id_producto: number;
  sku:    string;
  nombre_producto:      string;
  precio: string;
  categoria: string;
  marca: string;
  existencias: string;
  descripcion: string;
  provedor: string;
  estado:      EstadoProducto;
  imagen: string;
}

interface UseProductoForm {
  state: FormProductoData;
  handleInputChange: ( fieldName: keyof FormProductoData, value: string | number ) => void;
  handleSubmit: () => Promise<void>;
  handleDelete: () => Promise<void>;
  handleUpdate: (estado: EstadoProducto) => Promise<void>;

}

export const useProductoForm = (): UseProductoForm => {

  const formInicial: FormProductoData = {
    id_producto: 0,
    sku:    '',
    nombre_producto: '',
    precio: '',
    categoria: '',
    marca: '',
    existencia: '',
    descripcion: '',
    provedor: '',
    estado:   EstadoProducto.normal,
    imagen: ''
  }

  type Action = { type: 'handleInputChange', payload: { fieldName: keyof FormProductoData, value: string | number } };

  const formReducer = ( state: FormProductoData, action: Action ): FormProductoData => {
    switch( action.type ){
      case 'handleInputChange':
        return {
          ...state,
          [ action.payload.fieldName ]: action.payload.value
        }
      default:
        return state;
    }
  }

  const [ state, dispatch ] = useReducer( formReducer, formInicial );
  const { createProducto, updateProducto, deleteProducto } = useProductosApi();

  const handleInputChange = ( fieldName: keyof FormProductoData, value: string | number ) => {
    dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
  }

  const handleSubmit = async () => {
    if ( state.id_producto == 0 ){
      await createProducto( state );
    } else {
      await updateProducto( state );
    }
  }

  const handleDelete = async () => {
    await deleteProducto( state );
  }
  const handleUpdate = async ( estado: EstadoProducto ) => {
    await updateProducto({ ...state, estado });
  }
  return { state, handleInputChange, handleSubmit, handleDelete, handleUpdate };
}