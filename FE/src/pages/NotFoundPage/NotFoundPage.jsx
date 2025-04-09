import React from "react";
import { Link } from "react-router-dom";


export const NotFoundPage = () => {
  return (
    <section className="max-w-[31.25rem] w-full px-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="flex flex-col items-center [&_*]:text-white gap-4">
      <h1 className="text-[100px] font-bold md:text-[145px]">Oops!</h1>
      <p className="text-2xl text-center md:text-3xl">
        We can't seem to find the page you're looking for.
      </p>
      <span className="text-sm font-bold mt-0 md:mt-4">Error code: 404</span>
    </div>
    <ul className="flex items-center justify-center gap-[10px] mt-4 [&>li>a]:text-xs [&>li>a]:font-bold [&>li>a]:text-error-green md:mt-5">
      <li><Link to='/'>홈으로</Link></li>
      <li><Link to='/compare'>나의 기업 비교</Link></li>
      <li><Link to='/status'>비교 현황</Link></li>
      <li><Link to='/investment'>투자 현황</Link></li>
    </ul>
  </section>
  );
};
