import styles from "./MakeTableHeader.module.scss";

export function MakeTableHeader({
  Name,
  Rank,
  InvestAmount,
  Coment,
  investId,
}) {
  return (
    <div className="flex items-center
    rounded-sm bg-black100 
    [&>div]:flex [&>div]:justify-center [&>div]:py-[10px]
    [&>div]:text-sm [&>div]:font-medium
    " data-key={investId}>
      <div className="flex-[2] md:flex-[2]">{Name}</div>
      <div className="flex-1">{Rank}</div>
      <div className="flex-[2] md:flex-[2]">{InvestAmount}</div>
      <div className="flex-[4] md:flex-[8]">{Coment}</div>
    </div>
  );
}

export default MakeTableHeader;
