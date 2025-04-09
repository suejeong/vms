import { instance, safeExecute } from "./Common.js";

//전체 회사 리스트 가져오기
export const getCompanyList = async () => {
  return safeExecute(async () => {
    const res = await instance.get(`/company`);
    return res.data;
  });
};

//투자 현황이 있는 전체 회사 리스트 가져오기
export const getInvestedCompanies = async () => {
  return safeExecute(async () => {
    const res = await instance.get(`/company/view`);
    return res.data;
  });
};

//회사 1개의 정보만 가져오기
export const getCompany = async (companyId) => {
  return safeExecute(async () => {
    const res = await instance.get(`/company/detail/${companyId}`);

    return res.data;
  });
};

// 회사 비교하기
export const getComparedcompany = async (myCompanyId, compareCompanyIds) => {
  return safeExecute(async () => {
    const compareCompanyIdsArray = compareCompanyIds.join(",");
    const res = await instance.get(
      `/company/compare/${myCompanyId}?compareCompanyIds=${encodeURIComponent(
        compareCompanyIdsArray
      )}`
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

// 검색 및 페이지네이션 API 호출
export const searchCompanies = async (
  searchQuery,
  page = 1,
  limit = 10,
  orderBy = "orderByName_asc",
  excludeId
) => {
  return safeExecute(async () => {
    const res = await instance.get(`/company/search`, {
      params: {
        search: searchQuery,
        page,
        limit,
        orderBy,
        excludeId,
      },
    });

    return res.data;
  });
};
