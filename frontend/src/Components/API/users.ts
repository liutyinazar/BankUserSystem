import axios from 'axios'

import { IUserData } from "../../types";

export const usersListData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/`);

      const data: IUserData[] = await response.data;
      return(data);


    } catch (error: any) {
        throw(error.message);
    } 
  };