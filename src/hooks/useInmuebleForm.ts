import { useReducer } from 'react';
import { useInmuebleApi } from './useInmuebleApi';
import { Tipo, Operacion } from '../interfaces/pandoraApiResponse';

export interface FormInmuebleData {
    id_im: number;
    titulo: string;
    operacion: Operacion;
    tipo: Tipo;
    precio: string;
    direccion: string;
    superficie: string;
    habitaciones: string;
    banos: string;
    descripcion: string;
    contacto: string;
    imagen1: string;
    imagen2: string;
    imagen3: string;
    imagen4: string;
}

interface UseInmuebleForm {
    state: FormInmuebleData;
    handleInputChange: (fieldName: keyof FormInmuebleData, value: string | number) => void;
    handleSubmit: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleUpdate: (tipo: Tipo) => Promise<void>;
    handleUpdateOperacion: (operacion:Operacion)=>Promise<void>;
}

type Action = {
    type: 'handleInputChange';
    payload: { fieldName: keyof FormInmuebleData; value: string | number };
};

const formInicial: FormInmuebleData = {
    id_im: 0,
    titulo: '',
    operacion: Operacion.renta,
    tipo: Tipo.residencial,
    precio: '',
    direccion: '',
    superficie: '',
    habitaciones: '',
    banos: '',
    descripcion: '',
    contacto: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
};

const formReducer = (state: FormInmuebleData, action: Action): FormInmuebleData => {
    switch (action.type) {
        case 'handleInputChange':
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };
        default:
            return state;
    }
};

export const useInmuebleForm = (): UseInmuebleForm => {
    const [state, dispatch] = useReducer(formReducer, formInicial);
    const { createInmueble, updateInmueble, deleteInmueble } = useInmuebleApi();

    const handleInputChange = (fieldName: keyof FormInmuebleData, value: string | number) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    const handleSubmit = async () => {
        if (state.id_im === 0) {
            await createInmueble(state);
        } else {
            await updateInmueble(state);
        }
    };

    const handleDelete = async () => {
        await deleteInmueble(state);
    };

    const handleUpdate = async (tipo: Tipo) => {
        await updateInmueble({ ...state, tipo });
    };

    const handleUpdateOperacion = async (operacion: Operacion)=>{
        await updateInmueble({...state,operacion});
    }
    return {
        state,
        handleInputChange,
        handleSubmit,
        handleDelete,
        handleUpdate,
        handleUpdateOperacion
    };
};