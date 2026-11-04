import { useReducer } from "react";
import { useBecaApi } from "./useBecaApi";
import { TipoBeca } from "../interfaces/pandoraApiResponse";

export interface FormBecaData {
  id_beca:       number;
  nombre:        string;
  matricula:     string;
  carrera:       string;
  promedio:      string;
  semestre:      string;
  email:         string;
  telefono:      string;
  justificacion: string;
  documentacion: string;
  tipo:          TipoBeca;
}

interface UseBecaForm {
  state: FormBecaData;
  handleInputChange: ( fieldName: keyof FormBecaData, value: string | number ) => void;
  handleSubmit: () => Promise<void>;
  handleDelete: () => Promise<void>;
  handleUpdate: ( tipo: TipoBeca ) => Promise<void>;
}

export const useBecaForm = (): UseBecaForm => {

  const formInicial: FormBecaData = {
    id_beca:       0,
    nombre:        '',
    matricula:     '',
    carrera:       '',
    promedio:      '',
    semestre:      '',
    email:         '',
    telefono:      '',
    justificacion: '',
    documentacion: '',
    tipo:          TipoBeca.escolar
  }

  type Action = { type: 'handleInputChange', payload: { fieldName: keyof FormBecaData, value: string | number } };

  const formReducer = ( state: FormBecaData, action: Action ): FormBecaData => {
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
  const { createBeca, updateBeca, deleteBeca } = useBecaApi();

  const handleInputChange = ( fieldName: keyof FormBecaData, value: string | number ) => {
    dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
  }

  const handleSubmit = async () => {
    if ( state.id_beca == 0 ){
      await createBeca( state );
    } else {
      await updateBeca( state );
    }
  }

  const handleDelete = async () => {
    await deleteBeca( state );
  }

  const handleUpdate = async ( tipo: TipoBeca ) => {
    await updateBeca({ ...state, tipo });
  }

  return { state, handleInputChange, handleSubmit, handleDelete, handleUpdate };
}