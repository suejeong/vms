import { instance, safeExecute } from "./Common";

//전체 회사 투자 리스트 가져오기
export const getInvestList = async () => {
  return safeExecute(async () => {
    const res = await instance.get(`/invest`);

    return res.data;
  });
};

// 특정투자 정보 하나 받아오기
export const getInvest = async (InvestId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/invest/${InvestId}`);

    return res.data;
  });
};
//특정 투자 비밀번호 유효성 검사
export const getInvestPassword = async (investId, userPassword) => {
  return safeExecute(async () => {
    const res = await instance.post(`/invest/password/${investId}`, {
      password: userPassword,
    });
    return res.data;
  });
};

// 특정 기업 투자 5개 받아오기
export const getCompanyInvest = async (companyId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/invest/company/${companyId}`);
    return res.data;
  });
};

// 특정 기업 투자 받아오기
export const getCompanyPageInvest = async (companyId, page) => {
  return safeExecute(async () => {
    const res = await instance.get(`/invest/company/${companyId}/${page}`);
    return res.data;
  });
};

// 투자 정보 추가하기 (새 투자)
export const createInvest = async (investData) => {
  return safeExecute(async () => {
    const res = await instance.post(`/invest`, investData);
    return res.data;
  });
};

// 투자 정보 수정하기 (기존 투자)
export const updateInvest = async (InvestId, investData) => {
  return safeExecute(async () => {
    const res = await instance.put(`/invest/${InvestId}`, investData);
    return res.data;
  });
};

// 투자 정보 삭제하기 (기존 투자)
export const deleteInvest = async (InvestId) => {
  return safeExecute(async () => {
    const res = await instance.delete(`/invest/${InvestId}`);
    return res.data;
  });
};
