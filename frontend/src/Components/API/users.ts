import axios from 'axios'

export const usersListData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/`);
      return(response.data);

    } catch (error) {
        throw(error);
    } 
  };

  export const addUser = async (number: number) => {
    try {
      for (let i = 0; i < number; i++) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/create/`);
        if (response.status !== 200 && response.status !== 201) {
          return 'Error adding user. Please try again.';
        }
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }

  export const deleteUser = async (number: number) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/users/${number}/delete/`)
      if (response.status !== 200 && response.status !== 204) {
        return 'Error delete user. Please try again.';
      }
      return true
    } catch (error) {
      return 'Error sending request. Please try again.';
    }
  }
  