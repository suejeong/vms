import React from "react";
import style from "./DashContainer.module.scss";
import MyCompanyModal from "../../modals/MyCompanyModal/MyCompanyModal";
import plusIc from "../../assets/btn_plus.png";

function DashContainer({
  isMyModalOpen,
  closeMyModal,
  handleSelectCompany,
  companies,
  recentCompanies,
  openMyModal,
}) {
  return (
    <div className={style.dash}>
      <div className={style.NotMyCompanyContainer}>
        <div className={style.addMyCompany}>
          <button onClick={openMyModal}>
            <img src={plusIc} alt="Add" />
          </button>
          <MyCompanyModal
            isOpen={isMyModalOpen}
            onClose={closeMyModal}
            onSelect={handleSelectCompany}
            companies={companies}
            recentCompanies={recentCompanies}
          />
          <p>기업 추가</p>
        </div>
      </div>
    </div>
  );
}

export default DashContainer;
