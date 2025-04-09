import styles from "./Description.module.scss";

export function Description({ text }) {
  return (
    <>
      <div className="
        flex flex-col gap-4 
        mt-4 px-6 py-5 
        bg-black300 rounded-[10px]
        md:mt-8
        md:px-6
        md:py-6
        
      ">
        <p className="text-base font-semibold">기업 소개</p>
        <p className="text-sm text-gray100">{text}</p>
      </div>
    </>
  );
}

export default Description;
