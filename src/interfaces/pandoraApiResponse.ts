export interface UserReponse {
  id_user: number;
  username: string;
  email: string;
  password: string;
  imagen: string;
  location: string;
  update: Date;
}
export enum EstadoTarea {
  pendiente = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado"
}

export interface TareaResponse {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
}
export const siguienteEstado = (estado: EstadoTarea): EstadoTarea => {
  const estados = Object.values(EstadoTarea);
  return estados[(estados.indexOf(estado) + 1) % estados.length];
}


export interface ProductosResponse {
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
export enum EstadoProducto {
  bajo = "Necesita stock",
  normal = "Normal"
}
export const nextState = (estado: EstadoProducto): EstadoProducto => {
  const estados = Object.values(EstadoProducto);
  return estados[(estados.indexOf(estado) + 1) % estados.length]
}

export enum EstadoMantenimiento {
  pendiente = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado",
}

export enum Prioridad {
  baja = "Baja",
  normal = "Normal",
  alta = "Alta",
}

export interface MantenimientoResponse {
  id_in: number;
  solicitante: string;
  area: string;
  ubicacion: string;
  tipo_mantenimiento: string;
  equipo: string;
  descripcion: string;
  prioridad: Prioridad;
  fecha: string;
  tecnico: string;
  estado: EstadoMantenimiento;
  observaciones: string;
  imagen1: string;
  imagen2: string;
  imagen3: string;
  imagen4: string;
}


export const siguienteEstadoMan = (estado: EstadoMantenimiento): EstadoMantenimiento => {
  const estados = Object.values(EstadoMantenimiento);
  return estados[(estados.indexOf(estado) + 1) % estados.length];
};

export const siguientePrioridad = (prioridad: Prioridad): Prioridad => {
  const prioridades = Object.values(Prioridad);
  return prioridades[(prioridades.indexOf(prioridad) + 1) % prioridades.length];
};
export enum Tipo {
  residencial = "Residencial",
  comercial = "Comercial",
  industriales = "Industriales",
  rusticos = "Rústicos"
}
export interface InmuebleResponse {
  id_im: number;
  titulo: string;
  operacion: string;
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
export enum Operacion {
  venta = "Venta",
  renta = "Renta"
}
export const siguienteOperacion = (operacion: Operacion): Operacion => {
  const operaciones = Object.values(Operacion);
  return operaciones[(operacion.indexOf(operacion) + 1) % operacion.length];
}
export const siguienteTipo = (tipo: Tipo): Tipo => {
  const tipos = Object.values(Tipo);
  return tipos[(tipos.indexOf(tipo) + 1) % tipos.length];
};


export enum TipoBeca {
  escolar = "Escolarizada",
  manutencion = "Manutencion"
}

export interface BecaResponse {

  id_beca: number;
  nombre: string;
  matricula: string;
  carrera: string;
  promedio: string;
  semestre: string;
  correo: string;
  telefono: string;
  tipo: TipoBeca;
  justificacion: string;
  documentacion: string;
  imagen1: string;
  imagen2: string;
  imagen3: string;
  imagen4: string;
}

export const nextBeca = (actual: TipoBeca): TipoBeca => {
  const tipos = Object.values(TipoBeca);
  return tipos[(tipos.indexOf(actual) + 1) % tipos.length];
}

export type LoginReponse = UserReponse | false;

export interface DataResponse {
  total: number;
  diasFrios: Dias[];
  diasCalurosos: Dias[];
  topTemperaturas: Sensor[];
  estadisticas: Estadisticas;
  ultimasHoras: Sensor[];
  alertas: Sensor[];
  hoy: Sensor[];
  ayer: Sensor[];
  anteayer: Sensor[];
}

export interface Sensor {
  id_sensor: number;
  fecha: Date;
  distancia_cm: number;
  distancia_inch: number;
  temperatura_celcius: number;
  temperatura_f: number;
}

export interface Dias {
  dia: Date;
  promedio: number;
}

export interface Estadisticas {
  total: string;
  temp_promedio: number;
  temp_maxima: number;
  temp_minimo: number;
  dist_promedio: number;
}


export interface ClienteDataResponse {
  total: number;
  estado: Cliente[];
  estados: TotalPorEstado[];
  clientes2026: Cliente[];
  clientesPorCorreo: Cliente[];
  uno: TotalPorCiudad[];
  ultimo: Cliente[];
}

export interface Cliente {
  id_cliente: number;
  nombre: string;
  correo: string;
  ciudad: string;
  estado: string;
  fecha_registro: Date;

}

export interface TotalPorEstado {
  total: number;
  estado: string;
}

export interface TotalPorCiudad {
  total: number;
  ciudad: string;
}

export interface Alumno {
  id_alumno: number;
  nombre: string;
  apellido: string;
  grado: number;
  grupo: string;
  fecha_nacimiento: Date;
  promedio: number;
  activo: boolean;
}

export interface PromedioGeneral {
  total: number;
  promedio_general: number;
}

export interface PromedioGradoGrupo {
  grado: number;
  grupo: string;
  promedio_por_grado_y_grupo: number;
}

export interface MejorPromedio {
  nombre: string;
  promedio: number;
}

export interface PromedioMayorGrado {
  nombre: string;
  grado: number;
  promedio_grado: number;
}

export interface AlumnoDataResponse {
  total: number;
  activos: number;
  segundoGrado: Alumno[];
  promedioGeneral: PromedioGeneral;
  promedio_Por_Grado_Y_Grupo: PromedioGradoGrupo[];
  mejoresPromedios: MejorPromedio[];
  promedioMenor: Alumno[];
  nacidos2012: Alumno[];
  promedioMayorGrado: PromedioMayorGrado[];
}


export interface EmpleadoDataResponse {
  total: number;
  tecnologia: EmpleadoTecnologia[];
  nomina: Nomina;
  promedioPorDepartamento: PromedioDepartamento[];
  contratadosDespues2022: Empleado[];
  salarioMasBajo: EmpleadoSalarioBajo[];
  departamentosSalarioBajo: PromedioDepartamento[];

}

export type EmpleadoTecnologia = Pick<Empleado, 'nombre' | 'departamento'>;



export interface EmpleadoSalarioBajo{
  id_empleado: number;
  nombre: string;
  salario_mensual: number

}

export interface Nomina {
  nomina_mensual: number;
  total_empleados: number;
}

export interface PromedioDepartamento {
  departamento: string;
  salario_promedio: number;
  total_empleados: number;
}

export interface Empleado {
  id_empleado: number;
  nombre: string;
  puesto: string;
  departamento: string;
  salario_mensual: number;
  fecha_contratacion: Date;

}

export interface Calificacion {
  id_calificacion: number;
  alumno_id: number;
  materia_id: number;
  bimestre: number;
  calificacion: number;
}

export interface PromedioMateria {
  materia_id: number;
  promedio: number;
}

export interface PromedioAlumno {
  alumno_id: number;
  promedio: number;
}

export type CalificacionBimestre = Pick<Calificacion, 'alumno_id' | 'calificacion'>;

export interface CalificacionDataResponse {
  total: number;
  prom: PromedioMateria[];
  promAlum: PromedioAlumno[];
  calif: Calificacion[];
  bimestre: CalificacionBimestre[];
  mejor: PromedioAlumno[];
  materiasBajas: PromedioMateria[];
}
