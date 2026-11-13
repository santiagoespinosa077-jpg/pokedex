import { useEffect, useState } from 'react';
import { obtenerApiUrlActual, guardarApiUrl, suscribirApiUrl } from '../config/api';

export const useApiUrl = () => {
  const [apiUrl, setApiUrl] = useState(obtenerApiUrlActual());

  useEffect(() => {
    return suscribirApiUrl(setApiUrl);
  }, []);

  return { apiUrl, guardarApiUrl };
};