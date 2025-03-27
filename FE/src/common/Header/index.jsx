import React, { useEffect, useState } from "react";
import './index.css'
import { Link, useLocation, useNavigate } from "react-router-dom";

const pagesURL = ['compare', 'status', 'investment']

export default function Header() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const idx = location.state && location.state.idx
        if(!idx) return;
        else if(idx === 0) setSelected(null);
        else {
            setSelected(idx)
            navigate(`/${pagesURL[idx - 1]}`)
        }
    }, [location])

    // 메뉴 클릭 시 상태 업데이트
    const handleClick = (index) => {
        setSelected(index);
    };   
    
    // Home이동 모든 상태 초기화
    const handleLogoClick = () => {
        setSelected(null);
    };

    return (
        <header className="header">
            <div className="content">
                <h1 className="logo">
                    <Link to='/' onClick={handleLogoClick}>
                        <img src="../../../images/img_logo.png" alt="main-logo" className="logoImg"/>
                    </Link>
                </h1>
                <Link 
                    to='/compare' 
                    className={`menuItem ${selected === 1 ? 'selected' : ''}`} 
                    onClick={() => handleClick(1)}
                >
                    나의 기업 비교
                </Link>
                <Link 
                    to='/status' 
                    className={`menuItem ${selected === 2 ? 'selected' : ''}`} 
                    onClick={() => handleClick(2)}
                >
                    비교 현황
                </Link>
                <Link 
                    to='/investment' 
                    className={`menuItem ${selected === 3 ? 'selected' : ''}`} 
                    onClick={() => handleClick(3)}
                >
                    투자 현황
                </Link>
            </div>
        </header>
    );
}
