import api from "@/lib/axios";

const getProperties = async () => {
  const res = await api.get("/properties");
  return res.data.data;
};

export default getProperties;
