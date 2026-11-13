import { useEffect, useState, useCallback } from "react";
import { cachasApi } from "../api/cachasApi";
import { UserReponse } from "../interfaces/pandoraApiResponse";
import { FormUserData } from "./useUserForm";
import { useApiUrl } from "./useApiUrl";

interface UseUserApi{
  isLoading:  boolean;
  listUser:   UserReponse[];
  loadUsers:  () => void;
  createUser: (data: FormUserData) => void;
  updateUser: (data: FormUserData) => void;
  deleteUser: (data: FormUserData) => void;
}

export const useUserApi = (): UseUserApi => {
  const { apiUrl } = useApiUrl();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ listUser, setListUser ] = useState<UserReponse[]>([]);
  const urlApi = `${apiUrl}/users`;

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await cachasApi.get<UserReponse[]>(urlApi);
      setListUser( response.data );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [urlApi]);

  const createUser = async ( data: FormUserData ) => {
    const dataBody = {
      username: data.username,
      password: data.password,
      email: data.email,
      imagen: data.imagen,
      location: data.location
    }

    await cachasApi.post( urlApi, dataBody );
  }

  const updateUser = async ( data: FormUserData ) => {
    if (data.password){
      const dataBody = {
        username: data.username,
        password: data.password,
        email: data.email,
        imagen: data.imagen,
        location: data.location
      }

      await cachasApi.patch( `${urlApi}/${data.id_user}`, dataBody );
    }else {
      const dataBody = {
        username: data.username,
        email: data.email,
        imagen: data.imagen,
        location: data.location
      }

      await cachasApi.patch( `${urlApi}/${data.id_user}`, dataBody );
    }
  }

  const deleteUser = async ( data: FormUserData ) => {
    await cachasApi.delete(`${urlApi}/${data.id_user}`);
  }

  return { isLoading, listUser, loadUsers, createUser, updateUser, deleteUser };

}