"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useMenu } from './MenuContext';

const CreateMenu = ({ menuType, selectMenuType = '', styles }) => {
    const { items, isLoading, error } = useMenu();

    const [selectDepth1Index, setSelectDepth1Index] = useState(null);
    const [selectDepth2Id, setSelectDepth2Id] = useState(null);
    const [fullDownState, setFullDownState] = useState(null);
    const [activeId, setActiveId] = useState(1);

    const handleDepth1MouseEnter = (index) => {
        setSelectDepth1Index(index);
    };
    const handleDepth2MouseEnter = (id) => {
        setSelectDepth2Id(id);
    };
    const handleMouseLeave = () => {
        setSelectDepth1Index(null);
        setSelectDepth2Id(null);
        setFullDownState(false);
    };
    const handleClick = (id, event) => {
        // 기본 이벤트 방지 (필요 시)
        event.preventDefault();
        setActiveId(id);
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    const sortedItems = items.sort((a, b) => a.order - b.order);

    if (menuType === styles.fullMenu) {
        return (
            <div className={styles.depth01}>
                <ul>
                    {sortedItems.filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1) => {
                        const hasDepth2Items = sortedItems.some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                        const hasDepth3Items = sortedItems.some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);

                        return (
                            <li
                                className={activeId === itemDepth1.id ? styles.active : ''}
                                key={itemDepth1.id}
                                onClick={(e) => handleClick(itemDepth1.id, e)}
                            >
                                <Link href={itemDepth1.href} prefetch={false}>
                                    <span>{itemDepth1.name}</span>
                                </Link>
                                {hasDepth2Items && (
                                    <div className={styles.depth02}>
                                        <ul className={styles.group}>
                                            {sortedItems.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                <li key={itemDepth2.id}>
                                                    <Link href={itemDepth2.href} prefetch={false}>
                                                        {itemDepth2.name}
                                                    </Link>
                                                    {hasDepth3Items && (
                                                        <div className={styles.depth03}>
                                                            <ul className={styles.group}>
                                                                {sortedItems.filter((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3).map((itemDepth3) => (
                                                                    <li key={itemDepth3.id}>
                                                                        <Link href={itemDepth3.href} prefetch={false}>
                                                                            <span>{itemDepth3.name}</span>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div
            className={`${styles.gnb} ${selectMenuType === styles.fullDown && fullDownState ? styles.active : ''}`}
            onMouseEnter={() => setFullDownState(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.depth01}>
                <ul>
                    {sortedItems.filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1, index) => {
                        const hasDepth2Items = sortedItems.some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                        const hasDepth3Items = sortedItems.some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);

                        return (
                            <li
                                key={itemDepth1.id}
                                className={selectDepth1Index === index ? styles.on : ''}
                                onMouseEnter={() => handleDepth1MouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link href={itemDepth1.href} prefetch={false}>
                                    <span>{itemDepth1.name}</span>
                                </Link>
                                {hasDepth2Items && (
                                    <div className={styles.depth02}>
                                        <div className={styles.titBox}>
                                            <strong>{itemDepth1.name}</strong>
                                            <p>메뉴를 클릭하시면 <br />해당 페이지로 이동합니다</p>
                                        </div>
                                        <ul className={styles.group}>
                                            {sortedItems.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                <li
                                                    key={itemDepth2.id}
                                                    className={selectDepth2Id === itemDepth2.id ? styles.active : ''}
                                                    onMouseEnter={() => handleDepth2MouseEnter(itemDepth2.id)}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <Link href={itemDepth2.href} prefetch={false}>
                                                        {itemDepth2.name}
                                                    </Link>
                                                    {selectDepth2Id === itemDepth2.id && hasDepth3Items && (
                                                        <div className={styles.depth03}>
                                                            <ul className={styles.group}>
                                                                {sortedItems.filter((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3).map((itemDepth3) => (
                                                                    <li key={itemDepth3.id}>
                                                                        <Link href={itemDepth3.href} prefetch={false}>
                                                                            <span>{itemDepth3.name}</span>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CreateMenu;