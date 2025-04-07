import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// 인스턴스
export const instance = axios.create({
  //배포 환경
  baseURL: VITE_API_URL,

  //로컬 환경
  //baseURL: VITE_BASE_URL,
});

// 에러 처리
const handleError = (error) => {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log("request failed");
  }
};

// 안전 검사
export const safeExecute = (func) => {
  try {
    return func();
  } catch (error) {
    handleError(error);
  }
};
