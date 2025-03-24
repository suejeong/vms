import React, { useState } from "react";
import styles from './index.module.css';
import { Link } from "react-router-dom";

export default function Header() {
    const [selected, setSelected] = useState(null);
    
    // 메뉴 클릭 시 상태 업데이트
    const handleClick = (index) => {
        setSelected(index);
    };   
    
    // Home이동 모든 상태 초기화
    const handleLogoClick = () => {
        setSelected(null);
    };

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <h1 className={styles.logo}>
                    <Link to='/' onClick={handleLogoClick}>
                        <img src="../../../images/img_logo.png" alt="main-logo" className={styles.logoImg}/>
                    </Link>
                </h1>
                <Link 
                    to='/compare' 
                    className={`${styles.menuItem} ${selected === 0 ? styles.selected : ''}`} 
                    onClick={() => handleClick(0)}
                >
                    나의 기업 비교
                </Link>
                <Link 
                    to='/status' 
                    className={`${styles.menuItem} ${selected === 1 ? styles.selected : ''}`} 
                    onClick={() => handleClick(1)}
                >
                    비교 현황
                </Link>
                <Link 
                    to='/investment' 
                    className={`${styles.menuItem} ${selected === 2 ? styles.selected : ''}`} 
                    onClick={() => handleClick(2)}
                >
                    투자 현황
                </Link>
            </div>
        </header>
    );
}
