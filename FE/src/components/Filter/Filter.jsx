
import React from "react";

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
      <div className="px-4 h-12 flex items-center gap-4 justify-between border border-gray200 rounded-[10px] hover:bg-black300">
        <div>{selectedFilter.label}</div>
        <img src="/images/icons/ic_toggle.png" alt="버튼" />
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
