export interface UserReponse {
  id_user:    number;
  username:   string;
  email:      string;
  password:   string;
  imagen:     string;
  location:   string;
  update:     Date;
}
export enum EstadoTarea{
  pendiente = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado"
}

export interface TareaResponse{
  id_tarea: number;
  titulo:   string;
  descripcion: string;
  estado:EstadoTarea;
}
export const siguienteEstado = ( estado: EstadoTarea ): EstadoTarea => {
  const estados = Object.values(EstadoTarea);
  return estados[ (estados.indexOf(estado) + 1) % estados.length ];
}
export type LoginReponse = UserReponse | false;