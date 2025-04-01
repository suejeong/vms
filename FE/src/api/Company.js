import { instance, safeExecute } from "./Common";

//전체 회사 리스트 가져오기
export const getCompanyList = async () => {
  return safeExecute(async () => {
    const res = await instance.get(`/company`);

    return res.data;
  });
};

//회사 1개의 정보만 가져오기
export const getCompany = async (companyId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/company/${companyId}`);

    return res.data;
  });
};

// 회사 비교하기
export const getComparedcompany = async (companyNames) => {
  return safeExecute(async () => {
    const queryParam = companyNames.join(",");
    const res = await instance.get(
      `/company/compare?name=${encodeURIComponent(queryParam)}`
    );

    return res.data;
  });
};

// 회사 순위로 리스트 가져오기
export const getCompanyRankingList = async (companyName, orderBy) => {
  return safeExecute(async () => {
    const res = await instance.get(
      `/company/ranking/${companyName}?orderBy=${orderBy}`
    );

    return res.data;
  });
};
// 회사 순위로 리스트 가져오기
export const updateViewInvestAmount = async () => {
  return safeExecute(async () => {
    const res = await instance.get(`/company/view`);
    return res.data;
  });
};
