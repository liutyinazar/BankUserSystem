import {client} from '../api/index'


export const banksListData = async () => {
    try {
      const response = await client.get(`/api/v1/banks/`);
      return(response.data);

    } catch (error) {
        console.log(error);
        throw error;

    } 
  };

  export const addBank = async (number: number, setProgress: (progress: number) => void) => {
    try {
      const increment = 100 / number;
  
      for (let i = 0; i < number; i++) {
        const response = await client.post(`/api/v1/banks/create/`);
        if (response.status !== 200 && response.status !== 201) {
          return 'Error adding bank. Please try again.';
        }
  
        const roundedProgress = Math.round((i + 1) * increment);
        setProgress(roundedProgress);
      }
  
      return true;
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }

  export const deleteBank = async (number: number) => {
    try {
      const response = await client.delete(`/api/v1/banks/${number}/delete/`)
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
      const response = await client.patch(
        `/api/v1/banks/${number}/update/`,
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

  export const getUsersInBank = async (number: number): Promise<number> => {
    try {
      const response = await client.get(
        `/api/v1/banks/${number}/users/`
      );
  
      if (response.status === 200) {
        const numberOfUsers = response.data.length;
        return numberOfUsers;
      }
  
      throw new Error('Error. Please try again.');
    } catch (error) {
      throw new Error('Error sending request. Please try again.');
    }
  }