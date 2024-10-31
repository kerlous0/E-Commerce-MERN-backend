const base_url = "http://localhost:3001";

export const fetchProduct = async () => {
  try {
    const response = await fetch(`${base_url}/product`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
