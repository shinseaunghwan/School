"use client"

import React, { useEffect } from 'react';


const BtnTop = ({styles}) => {
    useEffect(() => {
        window.addEventListener('scroll', scrollCheck);
        return () => {
            window.removeEventListener('scroll', scrollCheck);
        };
    }, []);

    const scrollCheck = () => {
        const scrollPosition = window.scrollY;
        const moveTop = document.querySelector(`.${styles.btn_top}`);
        if (scrollPosition > 300) {
            moveTop.style.display = 'block';
        } else {
            moveTop.style.display = 'none';
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <a
            onClick={handleClick}
            href=""
            className={`${styles.btn_top} ${styles.pulse}`}
            style={{ display: 'none' }}
        ><i className="xi-arrow-top" aria-hidden="true"></i><span className={styles.hid}>상단으로 이동</span>
        </a>
    );
};

export default BtnTop;
