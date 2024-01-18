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

  export const addBank = async (number: number) => {
    try {
      for (let i = 0; i < number; i++) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/banks/create/`);
        if (response.status !== 200 && response.status !== 201) {
          return 'Error adding bank. Please try again.';
        }
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }

  export const deleteBank = async (number: number) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/banks/${number}/delete/`)
      if (response.status !== 200 && response.status !== 204) {
        return 'Error delete bank. Please try again.';
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }
  
  export const editBank = async (number: number, updatedBankData: any) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/banks/${number}/update/`,
        updatedBankData
      );
      if (response.status !== 200 && response.status !== 204) {
        return 'Error delete bank. Please try again.';
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }