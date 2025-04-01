import React from "react";
import style from "./CompanyContainer.module.scss";
import MyCompany from "../MyCompany/MyCompany";
import CompareCompany from "../CompareCompany/CompareCompany";

function CompanyContainer({
  setMyCompany,
  myCompany,
  compareCompanies,
  removeCompareCompny,
}) {
  return (
    <div
      className={
        compareCompanies
          ? style.compareCompanyContainer
          : style.myCompanyContainer
      }
    >
      {compareCompanies ? (
        <CompareCompany
          compareCompanies={compareCompanies}
          removeCompareCompany={removeCompareCompny}
        />
      ) : (
        <MyCompany setMyCompany={setMyCompany} myCompany={myCompany} />
      )}
    </div>
  );
}

export default CompanyContainer;
