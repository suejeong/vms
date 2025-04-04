import { useQuery } from "@tanstack/react-query";
import { getCompanyList, getInvestedCompanies } from "./Company";

// 전체 기업 데이터
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies', 'all'],
    queryFn: getCompanyList,
    refetchOnMount : false, // (마운트 했을 때 새로 fetch X)
  });
};

// 투자 현황이 있는 기업만
export const useInvestedCompanies = () => {  
  return useQuery({
    queryKey: ['companies', 'invested'],
    queryFn: getInvestedCompanies,
    refetchOnMount : true, 
  });
};

// 기존 데이터를 다시 가져오고 싶다면 useQuery().refetch()
// 서버의 상태를 변경하고 싶다면 useMutation() 상태를 변경해도 자동으로 데이터를 다시 불러오지는 않는다.!!

