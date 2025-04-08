import React from "react";
import arrow_bottom from "../../assets/images/icons/arrow_bottom.png";

export default function Filter({
  filterOptions,
  selectedFilter,
  onSelectFilter,
  showFilterOptions,
  setShowFilterOptions,
}) {
  return (
    <button
      className="relative min-w-[200px] [&_*]:text-gray100 [&_*]:text-xs md:[&_*]:text-sm"
      onClick={() => setShowFilterOptions((prev) => !prev)}
    >
      <div className="px-4 h-10 md:h-12 flex items-center justifybetween gap-2 md:gap-4 border border-gray200 rounded-[10px] hover:bg-black300">
        <div className="flex-1 flex justify-start">{selectedFilter.label}</div>
        <img
          src={arrow_bottom}
          alt="버튼"
          className={`transition-transform duration-200 ease-in-out ${
            showFilterOptions ? "-rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {showFilterOptions && (
        <ul
          className="
            w-full
            absolute
            top-[100%]
            mt-2
            border
            border-gray200
            rounded-[10px]
            overflow-hidden
            [&>li]:bg-black400
            [&>li]:px-6
            [&>li]:h-10
            [&>li]:flex
            [&>li]:items-center
            [&>li]:justify-center
            [&>li]:border-b 
            [&>li:last-child]:border-b-0
            [&>li]:border-gray200
            [&>li]:whitespace-nowrap
            [&>li:hover]:bg-black300
          "
        >
          {filterOptions.map((option, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation(); //제가 전체를 버튼으로 만들어서.. button이벤트 막기.
                onSelectFilter(option);
                console.log(option.sort);
                setShowFilterOptions(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
