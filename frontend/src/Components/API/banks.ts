import axios from 'axios'

import { IBankData } from "../../types";

export const banksListData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/banks/`);

      const data: IBankData[] = await response.data;
      return(data);

    } catch (error: any) {
        console.log(error.message);
        throw error;
    } 
  };
