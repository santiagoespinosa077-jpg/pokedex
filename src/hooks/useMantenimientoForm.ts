import { useReducer } from "react";
import { useMantenimientoApi } from "./useMantenimientoApi";
import { EstadoMantenimiento, Prioridad, MantenimientoResponse} from "../interfaces/pandoraApiResponse";

export type FormMantenimientoData = Omit<MantenimientoResponse, 'fecha'>;

interface UseMantenimientoForm {
    state: FormMantenimientoData;
    handleInputChange: (fieldName: keyof FormMantenimientoData, value: string | number) => void;
    handleSubmit: () => Promise<void>;
    handleDelete: () => Promise<void>;
    handleUpdate: (estado: EstadoMantenimiento) => Promise<void>;
    handleUpdatePrioridad: (prioridad: Prioridad) => Promise<void>;
}

type Action = {
    type: 'handleInputChange';
    payload: { fieldName: keyof FormMantenimientoData; value: string | number };
};

const formInicial: FormMantenimientoData = {
    id_in: 0,
    solicitante: '',
    area: '',
    ubicacion: '',
    tipo_mantenimiento: '',
    equipo: '',
    tecnico: '',
    descripcion: '',
    prioridad: Prioridad.normal,
    observaciones: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    estado: EstadoMantenimiento.pendiente,
};

const formReducer = (state: FormMantenimientoData, action: Action): FormMantenimientoData => {
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

export const useMantenimientoForm = (): UseMantenimientoForm => {
    const [state, dispatch] = useReducer(formReducer, formInicial);
    const { createMantenimiento, updateMantenimiento, deleteMantenimiento } = useMantenimientoApi();

    const handleInputChange = (fieldName: keyof FormMantenimientoData, value: string | number) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    const handleSubmit = async () => {
        if (state.id_in === 0) {
            await createMantenimiento(state);
        } else {
            await updateMantenimiento(state);
        }
    };

    const handleDelete = async () => {
        await deleteMantenimiento(state);
    };

    const handleUpdate = async (estado: EstadoMantenimiento) => {
        await updateMantenimiento({ ...state, estado });
    };

    const handleUpdatePrioridad = async (prioridad: Prioridad) => {
        await updateMantenimiento({ ...state, prioridad });
    };

    return {
        state,
        handleInputChange,
        handleSubmit,
        handleDelete,
        handleUpdate,
        handleUpdatePrioridad,
    };
};