import { useQuery } from "@tanstack/react-query";
import { getCompanyList, getInvestedCompanies } from "./Company";

// 전체 기업 데이터
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies', 'all'],
    queryFn: getCompanyList,
  });
};

// 투자 현황이 있는 기업만
export const useInvestedCompanies = () => {  
  return useQuery({
    queryKey: ['companies', 'invested'],
    queryFn: getInvestedCompanies,
  });
};
