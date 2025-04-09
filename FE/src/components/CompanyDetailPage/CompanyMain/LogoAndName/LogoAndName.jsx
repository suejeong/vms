
export function LogoAndName({ imgSrc, companyName, companyCategory }) {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-black100 md:gap-5 md:pb-8">
      <img src={imgSrc} alt={companyName} className="w-12 rounded-full md:w-20"/>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold md:text-2xl"> {companyName}</p>
        <p className="text-base text-gray200 md:text-xl">{companyCategory}</p>
      </div>
    </div>
  );
}

export default LogoAndName;
