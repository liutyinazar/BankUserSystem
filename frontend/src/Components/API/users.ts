import {client} from '../API/index'

export const usersListData = async () => {
    try {
      const response = await client.get(`/api/v1/users/`);
      return(response.data);

    } catch (error) {
        throw(error);
    } 
  };

  export const addUser = async (number: number, setProgress: (progress: number) => void) => {
    try {
      const increment = 100 / number;
  
      for (let i = 0; i < number; i++) {
        const response = await client.post(`/api/v1/users/create/`);
        
        if (response.status !== 200 && response.status !== 201) {
          return 'Error adding user. Please try again.';
        }
        const roundedProgress = Math.round((i + 1) * increment);
        setProgress(roundedProgress);
      }
  
      return true;
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  };

  export const deleteUser = async (number: number) => {
    try {
      const response = await client.delete(`/api/v1/users/${number}/delete/`)
      if (response.status !== 200 && response.status !== 204) {
        return 'Error delete user. Please try again.';
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }
  
  export const editUser = async (number: number, updatedUserData: any) => {
    try {
      const response = await client.patch(
        `api/v1/users/${number}/update/`,
        updatedUserData
      );
      if (response.status !== 200 && response.status !== 204) {
        return 'Error delete user. Please try again.';
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }