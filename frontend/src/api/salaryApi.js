import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const fetchInsights = async (job_role, city, experience) => {
  const res = await API.get("/salary/insights", {
    params: { job_role, city, experience }
  });
  return res.data; 
};