import axios from "axios";

const base_url = "http://localhost:3001";

export const fetchProduct = async () => {
  try {
    const response = await axios.get(`${base_url}/product`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async (formData: FormData) => {
  try {
    const response = await axios.post(`${base_url}/user/register`, formData);
    return { success: true, data: response.data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, error: error.response?.data };
  }
};
