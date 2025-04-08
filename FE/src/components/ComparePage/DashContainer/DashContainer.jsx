import React from "react";
import style from "./DashContainer.module.scss";
import btn_plus from "../../../assets/images/icons/btn_plus.png";

function DashContainer({ openModal }) {
  return (
    <div className={style.dash}>
      <div className={style.NotMyCompanyContainer}>
        <div className={style.addMyCompany}>
          <button onClick={openModal}>
            <img src={btn_plus} alt="Add" />
          </button>
          <p>기업 추가</p>
        </div>
      </div>
    </div>
  );
}

export default DashContainer;
