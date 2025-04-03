import React from "react";

// 🔽 예시 데이터 (해당 컴포넌트는 titleList를 props로 전달받습니다)
// 각 항목은 테이블 헤더의 내용을 나타내며, 다음 두 속성을 포함합니다:
// - title: 실제 화면에 표시될 텍스트
// - flex: 각 항목의 너비 비율을 지정하는 Tailwind CSS 클래스
//
// 예시:
// const titleList = [
//     { title: '순위', flex: 'flex-1' },
//     { title: '기업명', flex: 'flex-[3]' },
//     { title: '기업 소개', flex: 'flex-[4]' },
//     { title: '카테고리', flex: 'flex-[2]' },
//     { title: '누적 투자 금액', flex: 'flex-[2]' },
//     { title: '매출액', flex: 'flex-[2]' },
//     { title: '고용인원', flex: 'flex-[2]' },
// ];

export default function BoardTitleBar({titleList}) {
    return (
        <ul
        className="
            w-full
            flex items-center
            mb-4
            rounded-[4px]
            bg-black200
            [&>li]:flex
            [&>li]:justify-center
            [&>li]:py-[10px]
            [&>li]:text-sm
            [&>li]:font-medium
        "
        >
        {
            titleList.map((list, index) => 
                <li key={index} className={`${list.flex} whitespace-nowrap`}>
                    {list.title}
                </li>
            )
        }
        </ul>
    ) 
}
