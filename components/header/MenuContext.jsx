"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children, initialItems = [] }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                // initialItems가 제공되면 사용, 그렇지 않으면 기본 staticItems 사용
                const staticItems = initialItems.length > 0 ? initialItems : [];
                setItems(staticItems);
            } catch (err) {
                setError('메뉴 데이터를 불러오지 못했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, [initialItems]); // initialItems가 변경될 때마다 useEffect 실행

    return (
        <MenuContext.Provider value={{ items, isLoading, error }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);