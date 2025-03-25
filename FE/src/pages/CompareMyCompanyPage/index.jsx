export const CompareMyCompany = () => {
  return (
    <div>
      <h1>나의 기업을 선택해 주세요!</h1>
      <div className="my-company-container">
        <div className="add-my-company">
          <button className="add-button">+</button>
          <p>기업 추가</p>
        </div>
      </div>
      <h1>어떤 기업이 궁금하세요?</h1>
      <button className="add-compare-company">기업 추가하기</button>
      <div className="compare-compaany-container">
        <p>
          아직 추가한 기업이 없어요,
          <br />
          버튼을 눌러 기업을 추가해보세요!
        </p>
      </div>
      <button className="compare-button">기업 비교하기</button>
    </div>
  );
};
