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

export enum EstadoMan {
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
  fecha:              string;   // formato AAAA-MM-DD
  tecnico:            string;
  estado:             EstadoMan;
  observaciones:      string;
  imagen1:            string;
  imagen2:            string;
  imagen3:            string;
  imagen4:            string;
}

// Mismo modelo que usa el formulario
export type FormMantenimientoData = MantenimientoResponse;

// Botones que cambian de valor: pasan al siguiente de la lista y vuelven al inicio
export const siguienteEstadoMan = (estado: EstadoMan): EstadoMan => {
  const estados = Object.values(EstadoMan);
  return estados[(estados.indexOf(estado) + 1) % estados.length];
};

export const siguientePrioridad = (prioridad: Prioridad): Prioridad => {
  const prioridades = Object.values(Prioridad);
  return prioridades[(prioridades.indexOf(prioridad) + 1) % prioridades.length];
};

// Colores compartidos por la tarjeta y el formulario
export const colorEstado: Record<EstadoMan, string> = {
  [EstadoMan.pendiente]:  '#E8A317',
  [EstadoMan.en_proceso]: '#3B82C4',
  [EstadoMan.completado]: '#3FA672',
};

export const colorPrioridad: Record<Prioridad, string> = {
  [Prioridad.alta]:   '#D9534F',
  [Prioridad.normal]: '#8A97A6',
  [Prioridad.baja]:   '#5B9E8F',
};

export const nuevaMantenimiento = (): MantenimientoResponse => ({
  id_in: 0,
  solicitante: '',
  area: '',
  ubicacion: '',
  tipo_mantenimiento: '',
  equipo: '',
  descripcion: '',
  prioridad: Prioridad.normal,
  fecha: new Date().toISOString().slice(0, 10),
  tecnico: '',
  estado: EstadoMan.pendiente,
  observaciones: '',
  imagen1: '',
  imagen2: '',
  imagen3: '',
  imagen4: '',
});

export type LoginReponse = UserResponse | false;