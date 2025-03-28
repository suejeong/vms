import styles from "../CompanyDetailPage.module.css";

export function InvestTable({ investData }) {
  const headers = [
    {
      text: "투자자 이름",
      value: "name",
    },
    {
      text: "순위",
      value: "investRank",
    },
    {
      text: "투자 금액",
      value: "investAmount",
    },
    {
      text: "투자 코멘트",
      value: "investComnet",
    },
    {
      text: "",
      value: "button",
    },
  ];
  const items = [
    {
      name: investData[0].username,
      investRank: "1위",
      investAmount: investData[0].invest_amount,
      investComnet: "111",
      button: <button className="investDeleteButton"></button>,
    },
    {
      name: investData[1].username,
      investRank: "2위",
      investAmount: investData[1].invest_amount,
      investComnet: "222",
      button: <button className="investDeleteButton"></button>,
    },
    {
      name: investData[2].username,
      investRank: "3위",
      investAmount: investData[2].invest_amount,
      investComnet: "333",
      button: <button className="investDeleteButton"></button>,
    },
    {
      name: investData[3].username,
      investRank: "4위",
      investAmount: investData[3].invest_amount,
      investComnet: "444",
      button: <button className="investDeleteButton"></button>,
    },

    {
      name: investData[4].username,
      investRank: "5위",
      investAmount: investData[4].invest_amount,
      investComnet: "555",
      button: <button className="investDeleteButton"></button>,
    },
  ];

  const headerKey = headers.map((header) => header.value);
  return (
    <div>
      <div className={styles.investTableHeader}>
        {headers.map((header) => (
          <div
            key={header.text}
            className={styles.detialPageWeight500}
            style={{ fontSize: "14px" }}
          >
            {header.text}
          </div>
        ))}
      </div>
      <br></br>
      <div className={styles.investTableBody}>
        {items.map((item, index) => (
          <div key={index} className={styles.investTableRow}>
            {headerKey.map((key) => (
              <div key={key + index} className={styles.detialPageWeight400}>
                {item[key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvestTable;
