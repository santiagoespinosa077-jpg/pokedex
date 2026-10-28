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

export type LoginReponse = UserResponse | false;