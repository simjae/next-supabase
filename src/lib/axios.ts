import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
