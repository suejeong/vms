import React, { useState } from "react";
import styles from "./InvestmentPage.module.scss";
import InvestmentPanel from "../../components/InvestmentPanel/InvestmentPanel";
import Title from "../../components/Title/Title";

export default function InvestmentPage() {
  return (
    <section>
      <div>
        <Title text={"투자 현황"} />
        <Filter />
      </div>
    </section>
  );
}
