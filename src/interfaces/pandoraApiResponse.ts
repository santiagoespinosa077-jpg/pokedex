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


export interface ProductosResponse{
  id_producto: number,
  sku: string;
  nombre_producto: string;
  categoria: string;
  marca: string;
  precio: string;
  existencias: string;
  descripcion: string;
  provedor: string;
  imagen: string;
  estado: EstadoProducto;
}
export enum EstadoProducto{
  bajo="Necesita stock",
  normal="Normal"
}
export const nextState =(estado: EstadoProducto): EstadoProducto =>{
  const estados=Object.values(EstadoProducto);
  return estados [(estados.indexOf(estado)+1)% estados.length]
}

export enum EstadoMantenimiento {
  pendiente  = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado",
}

export enum Prioridad {
  baja   = "Baja",
  normal = "Normal",
  alta   = "Alta",
}

export interface MantenimientoResponse {
  id_in:              number;
  solicitante:        string;
  area:               string;
  ubicacion:          string;
  tipo_mantenimiento: string;
  equipo:             string;
  descripcion:        string;
  prioridad:          Prioridad;
  fecha:              string;   
  tecnico:            string;
  estado:             EstadoMantenimiento;
  observaciones:      string;
  imagen1:            string;
  imagen2:            string;
  imagen3:            string;
  imagen4:            string;
}



// Botones que cambian de valor: pasan al siguiente de la lista y vuelven al inicio
export const siguienteEstadoMan = (estado: EstadoMantenimiento): EstadoMantenimiento => {
  const estados = Object.values(EstadoMantenimiento);
  return estados[(estados.indexOf(estado) + 1) % estados.length];
};

export const siguientePrioridad = (prioridad: Prioridad): Prioridad => {
  const prioridades = Object.values(Prioridad);
  return prioridades[(prioridades.indexOf(prioridad) + 1) % prioridades.length];
};

export type LoginReponse = UserReponse | false;