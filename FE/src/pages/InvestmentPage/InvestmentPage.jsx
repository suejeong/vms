import React, { useState } from "react";
import InvestmentPanel from "../../components/InvestmentPanel/InvestmentPanel";

export default function InvestmentPage() {
    const [isInvested, setIsInvested] = useState(false);

    const handleInvest = () => {
        setIsInvested((prev) => !prev);
    };
    
  return (
    <>
    {/* 해당 코드들은 나중에 기업 투자하기 완성된 후 삭제하도록 하겠습니다. 감사합니다!!! */}
      <button onClick={handleInvest} style={{color : "white"}}>기업에 투자하기(이거 나중에 삭제할게요!!)</button>
        {
            isInvested &&
            <InvestmentPanel handleInvest={handleInvest}/>
        }
    </>
  )
}
