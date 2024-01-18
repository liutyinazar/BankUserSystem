import axios from 'axios'

export const banksListData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/banks/`);
      return(response.data);

    } catch (error) {
        console.log(error);
        throw error;

    } 
  };
