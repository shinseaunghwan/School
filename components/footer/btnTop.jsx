"use client"

import React, { useEffect } from 'react';
import footer from "../../styles/Layout.module.css";

const BtnTop = () => {
    useEffect(() => {
        window.addEventListener('scroll', scrollCheck);
        return () => {
            window.removeEventListener('scroll', scrollCheck);
        };
    }, []);

    const scrollCheck = () => {
        const scrollPosition = window.scrollY;
        const moveTop = document.querySelector(`.${footer.btn_top}`);
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
            className={`${footer.btn_top} ${footer.pulse}`}
            style={{ display: 'none' }}
        ><i className="xi-arrow-top" aria-hidden="true"></i><span className={footer.hid}>상단으로 이동</span>
        </a>
    );
};

export default BtnTop;
