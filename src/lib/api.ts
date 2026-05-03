import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const getProperties = async () => {
  const res = await axios.get(`${API}/properties`);
  return res.data.data;
};
export { getProperties };
