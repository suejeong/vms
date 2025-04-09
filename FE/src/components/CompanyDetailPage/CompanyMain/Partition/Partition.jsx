import ChangeToNumber from "../../ChangeToNumber/ChangeToNumber";
export function Patition({ colum, value }) {
  return (
    <>
      <div className="
        flex-1 flex flex-col items-center justify-center gap-4
        py-9 px-0
        rounded-[10px]
        bg-black200
        md:py-0
        md:h-[93px]
        md:px-6
        md:flex-row
        md:gap-0
      ">
        <p className="flex-1 text-sm text-gray100 text-nowrap md:text-base">{colum}</p>
        <p className="text-sm font-semibold text-nowrap md:text-base"> {ChangeToNumber(value)}</p>
      </div>
    </>
  );
}

export default Patition;
