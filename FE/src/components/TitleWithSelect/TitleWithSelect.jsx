import React, { useState } from "react";
import styles from "./TitleWithSelect.module.css";

export default function TitleWithSelect({ title, options, handleFilter, selectedFilter }) {
    const [select, setSelect] = useState(false);

    const toggleOptions = () => {
        setSelect((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.selectBox} onClick={toggleOptions}>
                <p className={styles.firstOption}>{selectedFilter}</p> 
                <img
                    src="../../images/vector_stroke.png"
                    alt="stroke"
                    className={styles.selectImg}
                />
                {select && (
                    <ul className={styles.dropdownBox}>
                        {options.map((option, index) => (
                            <button
                                key={index}
                                value={option}
                                onClick={(e) => {
                                    handleFilter(e.target.value); 
                                    setSelect(false); 
                                }}
                                className={styles.dropdownMenu}
                            >
                                {option}
                            </button>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
