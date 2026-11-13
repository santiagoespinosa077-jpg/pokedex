import Constants from 'expo-constants';

const PUERTO_API = 3000;

const obtenerHost = () => {
  // hostUri llega como "192.168.1.15:8081"; nos quedamos solo con la IP
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) return hostUri.split(':')[0];
  return 'localhost';
};

// Valor por defecto si no se ha escrito ninguna dirección en la pantalla
const urlPorDefecto = () =>
  process.env.EXPO_PUBLIC_API_URL ?? `http://${obtenerHost()}:${PUERTO_API}`;

// Dirección escrita en la pantalla; vive en memoria mientras la app esté abierta
let urlActual: string | null = null;

type Escucha = (url: string) => void;
const escuchas = new Set<Escucha>();

export const obtenerApiUrlActual = () => urlActual ?? urlPorDefecto();

export const obtenerApiUrl = async () => obtenerApiUrlActual();

export const guardarApiUrl = async (url: string) => {
  let limpia = url.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(limpia)) limpia = `http://${limpia}`;
  urlActual = limpia;
  escuchas.forEach(fn => fn(limpia));
  return limpia;
};

// Devuelve una función para cancelar la suscripción
export const suscribirApiUrl = (fn: Escucha) => {
  escuchas.add(fn);
  return () => {
    escuchas.delete(fn);
  };
};