import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// 이미지 import 추가
import mainLogo from "/src/assets/images/logos/mainPcLogo.png";

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black400 border-b border-black100">
      <div className="mx-4 h-[60px] lg:mx-6  xl:max-w-[1200px] xl:mx-auto flex items-center gap-5 xl:gap-10">
        <h1>
          <Link to='/'><img src={mainLogo} alt="main-logo" className="w-16 md:w-[112px]" /></Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-4 md:gap-8 text-[13px] font-semibold md:text-[15px]">
            <li>
              <Link to='/compare' className={`${location.pathname.includes("compare") ? "text-white" : "text-gray200"}`}>
                나의 기업 비교
              </Link>
            </li>
            <li>
              <Link to='/status' className={`${location.pathname.includes("status") ? "text-white" : "text-gray200"}`}>
                비교 현황
              </Link>
            </li>
            <li>
              <Link to='/investment' className={`${location.pathname.includes("investment") ? "text-white" : "text-gray200"}`}>
                투자 현황
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
