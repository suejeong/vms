# 🚀 ViewMyStartup - Team4

## 프로젝트 주제 
**ViewMyStartup**
![ViewMyStartup Logo](https://pplx-res.cloudinary.com/image/upload/v1744104891/user_uploads/HKBlYxFIrgHYJyC/img_thumbnail_view-my-startup.jpg)

스타트업 기업 정보를 쉽게 검색하고, 비교하고, 투자 정보까지 관리할 수 있는 올인원 플랫폼.

## 목차
- [프로젝트 기간](#프로젝트-기간)  
- [배포](#배포)
- [주요 기능](#주요-기능)  
- [팀원](#팀원)  
- [기술 스택](#기술-스택)  
- [프로젝트 구조 예시](#프로젝트-구조-예시)

## 프로젝트 기간
2025.03.21 ~ 2025.04.10

## 배포 

[개발 문서 노션 페이지 보러가기](https://emphasized-horse-08d.notion.site/Team-4-Project-Note-1c4cdb781b8880cf8bdef899d075f0e2)

[ViewMyStartup 접속하기 (FE)](https://viewmystartup4team.netlify.app/)

[백엔드 서버 접속하기 (BE)](https://view-my-startup-fa0a.onrender.com/)


## 주요 기능

- 🔍 **스타트업 기업 정보 검색**  
- 📊 **여러 스타트업 간 정보 비교 기능**
- 💰 **투자 정보 등록/수정/삭제(CRUD)**  
- 📈 **투자 내역 기반 비교 페이지 제공**

## 팀원
| 이름 | 깃허브 | 담당한 작업 |
|------|--------|-------------|
| 김수빈 | [GitHub](https://github.com/subinkim9755) | - 기업 상세 페이지 제작 (전체 RR) <br> - 기업 상세 페이지 내 투자 CRUD 및 투자내역 실시간 최신화 (기능) <br> - 투자 및 기업데이터에 필요한 API 작성 (API) <br> - 데이터베이스 ERD 작성 |
| 홍성훈 |[GitHub](https://github.com/az0319h) | - 프론트엔드 개발을 주도적으로 담당 <br> - 전체 레이아웃 설계와 CSS 스타일링 <br> - 모두가 공통된 CSS코드를 최대한 적게 작성할 수 있도록 고려 <br> - 컴포넌트 단위의 UI 구성을 체계적으로 나누어 작업 <br> - 웹사이트의 CSS 및 스타일 컴포넌트 작업 전담 <br> - 반응형 디자인 고도화 |
| 심유빈 | [GitHub](https://github.com/shimyubin) | - 기업 비교 페이지 및 기업 선택 모달 구현 <br> - 검색 컴포넌트 구현 및 검색 기능 담당 <br> - 검색과 필터 호출 API 구현 |
| 김재욱 | [GitHub](https://github.com/WooGie911) | - 기업 비교 결과 페이지 개발 <br> - FE: comparePage 내 기업 비교 결과 및 기업 순위 담당 <br> - company.js → company 관련 API 구성 <br> - BE: company.module.js → Company 테이블 관련 API 구성 <br> - 서버 배포: FE → Netlify, BE → Render, DB → Render <br> - DB 및 Prisma migrate 총 관리: schema 및 migrate 담당 <br> - 프로젝트 문서화: 회의록 작성 및 정리 |
| 황수정 |[GitHub](https://github.com/suejeong) | - 컴포넌트 작업 <br> - 검색 기능 구현 <br> - 테이블 작업: 전체 기업 리스트 담당 <br> - CSS 스타일링 <br> - API 작성: 기업 리스트 불러오는 BE/FE API 작성 |

## 기술 스택

| 영역        | 기술 스택                           |
|-------------|-------------------------------------|
| 프론트엔드   |<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">|
| 백엔드      |<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">|
| 데이터베이스 |<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">|
| 협업        |<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">|
| 배포        |<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=git&logoColor=white"> |


## 프로젝트 구조 예시

```bash
├── BE
│   └── src
│       ├── modules #백엔드 API
│       ├── db 
│       │   ├── prisma 
│       │   │   ├── migrations 
│       │   │   ├── schema.prisma #DB 스키마.
│       │   │   └── seed.js #DB seed 데이터.
│       └── app.js
├── FE
│   └── src
│       ├── assets/images
│       │   ├── companies #기업 로고 이미지.
│       │   ├── favicon 
│       │   ├── icons
│       │   └── logos
│       ├── apis
│       │   ├── Common.js 
│       │   ├── Company.js #기업 관련 API
│       │   └── Invest.js #투자 관련 API
│       ├── components
│       │   ├── common #공통으로 쓰이는 컴포넌트들.
│       │   │   ├── Error #API 통신 과정 에러처리.
│       │   │   ├── Header 
│       │   │   ├── IsLoading 
│       │   │   └── Layout
│       │   ├── Filter
│       │   ├── Pagination 
│       │   └── ... #그 외의 컴포넌트들.
│       ├── pages
│       ├── App.jsx
│       ├── main.jsx #라우팅 처리.
│       └── styles
└── public
```
[목차로](#목차)
