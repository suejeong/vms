import { instance, safeExecute } from "./Common";

//전체 회사 투자 리스트 가져오기
export const getInvestList = async () => {
  return safeExecute(async () => {
    const res = await instance.get(`/invests`);

    return res.data;
  });
};

// 특정 기업 투자 정보 하나 받아오기기
export const getInvest = async (InvestId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/invests/${InvestId}`);

    return res.data;
  });
};

// 특정 기업 투자 받아오기
export const getCompanyInvest = async (companyId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/invests/company/${companyId}`);

    return res.data;
  });
};
