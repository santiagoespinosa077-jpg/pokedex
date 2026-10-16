import { useReducer } from "react";
import { useTareaApi } from "./useTareaApi";
import { EstadoTarea } from "../interfaces/pandoraApiResponse";

export interface FormTareaData {
  id_tarea:    number;
  titulo:      string;
  descripcion: string;
  estado:      EstadoTarea;
}

interface UseTareaForm {
  state: FormTareaData;
  handleInputChange: ( fieldName: keyof FormTareaData, value: string | number ) => void;
  handleSubmit: () => Promise<void>;
  handleDelete: () => Promise<void>;
  handleUpdate: (estado: EstadoTarea) => Promise<void>;

}

export const useTareaForm = (): UseTareaForm => {

  const formInicial: FormTareaData = {
    id_tarea:    0,
    titulo:      '',
    descripcion: '',
    estado:      EstadoTarea.pendiente
  }

  type Action = { type: 'handleInputChange', payload: { fieldName: keyof FormTareaData, value: string | number } };

  const formReducer = ( state: FormTareaData, action: Action ): FormTareaData => {
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
  const { createTarea, updateTarea, deleteTarea } = useTareaApi();

  const handleInputChange = ( fieldName: keyof FormTareaData, value: string | number ) => {
    dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
  }

  const handleSubmit = async () => {
    if ( state.id_tarea == 0 ){
      await createTarea( state );
    } else {
      await updateTarea( state );
    }
  }

  const handleDelete = async () => {
    await deleteTarea( state );
  }
  const handleUpdate = async ( estado: EstadoTarea ) => {
    await updateTarea({ ...state, estado });
  }
  return { state, handleInputChange, handleSubmit, handleDelete, handleUpdate };
}