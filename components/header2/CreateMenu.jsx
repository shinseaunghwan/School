"use client"
import React, { useState} from 'react';
import styles from '../../styles/header2.module.css'; 

const CreateMenu = ({ menuType, selectMenuType }) => {
    
    const Items = [
        { href: '#', depth: 1, menuId: 'menu1', order: 1, name: "1뎁스 메뉴명1", id: 1},
        { href: '#', depth: 1, menuId: 'menu2', order: 2, name: "1뎁스 메뉴명2", id: 2 },
        { href: '#', depth: 1, menuId: 'menu5', order: 5, name: "1뎁스 메뉴명5", id: 3 },
        { href: '#', depth: 1, menuId: 'menu4', order: 4, name: "1뎁스 메뉴명4", id: 4 },
        { href: '#', depth: 1, menuId: 'menu3', order: 3, name: "1뎁스 메뉴명3", id: 5 },
        { href: '#', depth: 2, menuId: 'menu1', order: 1, name: "2뎁스 메뉴명1", id: 6 },
        { href: '#', depth: 2, menuId: 'menu2', order: 1, name: "2뎁스 메뉴명1", id: 7 },
        { href: '#', depth: 2, menuId: 'menu3', order: 1, name: "2뎁스 메뉴명1", id: 8 },
        { href: '#', depth: 2, menuId: 'menu3', order: 2, name: "2뎁스 메뉴명2", id: 9 },
        { href: '#', depth: 2, menuId: 'menu3', order: 3, name: "2뎁스 메뉴명3", id: 10 },
        { href: '#', depth: 3, menuId: 'menu2', order: 2, name: "3뎁스 메뉴명2", id: 11 },
        { href: '#', depth: 3, menuId: 'menu1', order: 1, name: "3뎁스 메뉴명1", id: 12 },
        { href: '#', depth: 3, menuId: 'menu3', order: 1, name: "3뎁스 메뉴명3", id: 13 },
        { href: '#', depth: 3, menuId: 'menu2', order: 1, name: "3뎁스 메뉴명2", id: 14 },
        { href: '#', depth: 2, menuId: 'menu4', order: 1, name: "2뎁스 메뉴명1", id: 15 },
        { href: '#', depth: 2, menuId: 'menu4', order: 2, name: "2뎁스 메뉴명2", id: 16 },
        { href: '#', depth: 2, menuId: 'menu4', order: 3, name: "2뎁스 메뉴명3", id: 17 }
    ];

    const [selectDepth1Index, setSelectDepth1Index] = useState(null);
    const [selectDepth2Id, setSelectDepth2Id] = useState(null);
    const [fullDownState, setFullDownState] = useState(null);

    const handleDepth1MouseEnter = (index) => {
        setSelectDepth1Index(index);
    }
    const handleDepth2MouseEnter = (id) => {
        setSelectDepth2Id(id);
    }
    const handleDepth1MouseLeave = () => {
        setSelectDepth1Index(null);
    }
    const handleDepth2MouseLeave = () => {
        setSelectDepth1Index(null);
        setSelectDepth2Id(null);
    }

    const [activeId, setActiveId] = useState(1);
    
        const handleClick = (id) => {
            setActiveId(id);
        };

    if (menuType === styles.fullMenu) {
        return (
            <div className={styles.depth01}>
                <ul>
                    {Items.sort((a, b) => a.order - b.order).filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1) => {
                        const hasDepth2Items = Items.some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                        const hasDepth3Items = Items.some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);

                        return (
                            <li
                                className={activeId === itemDepth1.id ? styles.active : ''}
                                key={itemDepth1.id}
                                onClick={() => handleClick(itemDepth1.id)}
                            >
                                <a href={itemDepth1.href}><span>{itemDepth1.name}</span></a>
                                {hasDepth2Items && (
                                    <div className={styles.depth02}>
                                        <ul className={styles.group}>
                                            {Items.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                <li key={itemDepth2.id}>
                                                    <a href={itemDepth2.href}>{itemDepth2.name}</a>
                                                    {hasDepth3Items && (
                                                        <div className={styles.depth03}>
                                                            <ul className={styles.group}>
                                                                {Items.filter((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3).map((itemDepth3) => (
                                                                    <li key={itemDepth3.id}>
                                                                        <a href={itemDepth3.href}><span>{itemDepth3.name}</span></a>
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
        <div className={`${styles.gnb} ${(selectMenuType === styles.fullDown && fullDownState) ? styles.active : ''}`} onMouseEnter={() => setFullDownState(true)} onMouseLeave={() => { setFullDownState(false); handleDepth2MouseLeave(); }}>
            <div className={styles.depth01}>
                <ul>
                    {Items.sort((a, b) => a.order - b.order).filter((itemDepth1) => itemDepth1.depth === 1).map((itemDepth1, index) => {
                        const hasDepth2Items = Items.sort((a, b) => a.order - b.order).some((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2);
                        const hasDepth3Items = Items.sort((a, b) => a.order - b.order).some((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3);

                        return (
                            <li key={itemDepth1.id} className={selectDepth1Index === index ? styles.on : ''} onMouseEnter={() => handleDepth1MouseEnter(index)} onMouseLeave={() => handleDepth1MouseLeave}><a href={itemDepth1.href}><span>{itemDepth1.name}</span></a>
                                {hasDepth2Items && (
                                    <div className={styles.depth02}>
                                        <div className={styles.titBox}>
                                            <strong>{itemDepth1.name}</strong>
                                            <p>메뉴를 클릭하시면 <br />해당 페이지로 이동합니다</p>
                                        </div>
                                        <ul className={styles.group}>
                                            {Items.filter((itemDepth2) => itemDepth2.menuId === itemDepth1.menuId && itemDepth2.depth === 2).map((itemDepth2) => (
                                                <li key={itemDepth2.id} className={selectDepth2Id === itemDepth2.id ? styles.active : ''} onMouseEnter={() => handleDepth2MouseEnter(itemDepth2.id)} onMouseLeave={() => handleDepth2MouseLeave}>
                                                    <a href={itemDepth2.href}>{itemDepth2.name}</a>
                                                    {selectDepth2Id === itemDepth2.id && hasDepth3Items && (
                                                        <div className={styles.depth03}>
                                                            <ul className={styles.group}>
                                                                {Items.filter((itemDepth3) => itemDepth3.menuId === itemDepth1.menuId && itemDepth3.depth === 3).map((itemDepth3, index) => (
                                                                    <li key={itemDepth3.id}>
                                                                        <a href={itemDepth3.href}><span>{itemDepth3.name}</span></a>
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
    )
}

export default CreateMenu