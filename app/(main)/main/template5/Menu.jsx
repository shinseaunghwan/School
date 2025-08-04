
const MenuList = ({ children }) => {
    const items = [
        { href: '/main/template5/sub', depth: 1, menuId: 'menu1', order: 1, name: "1뎁스 메뉴명1", id: 1 },
        { href: '/main/template5/sub', depth: 1, menuId: 'menu2', order: 2, name: "1뎁스 메뉴명2", id: 2 },
        { href: '/main/template5/sub', depth: 1, menuId: 'menu5', order: 5, name: "1뎁스 메뉴명5", id: 3 },
        { href: '/main/template5/sub', depth: 1, menuId: 'menu4', order: 4, name: "1뎁스 메뉴명4", id: 4 },
        { href: '/main/template5/sub', depth: 1, menuId: 'menu3', order: 3, name: "1뎁스 메뉴명3", id: 5 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu1', order: 1, name: "2뎁스 메뉴명1", id: 6 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu2', order: 1, name: "2뎁스 메뉴명1", id: 7 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu3', order: 1, name: "2뎁스 메뉴명1", id: 8 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu3', order: 2, name: "2뎁스 메뉴명2", id: 9 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu3', order: 3, name: "2뎁스 메뉴명3", id: 10 },
        { href: '/main/template5/sub', depth: 3, menuId: 'menu2', order: 2, name: "3뎁스 메뉴명2", id: 11 },
        { href: '/main/template5/sub', depth: 3, menuId: 'menu1', order: 1, name: "3뎁스 메뉴명1", id: 12 },
        { href: '/main/template5/sub', depth: 3, menuId: 'menu3', order: 1, name: "3뎁스 메뉴명3", id: 13 },
        { href: '/main/template5/sub', depth: 3, menuId: 'menu2', order: 1, name: "3뎁스 메뉴명2", id: 14 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu4', order: 1, name: "2뎁스 메뉴명1", id: 15 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu4', order: 2, name: "2뎁스 메뉴명2", id: 16 },
        { href: '/main/template5/sub', depth: 2, menuId: 'menu4', order: 3, name: "2뎁스 메뉴명3", id: 17 },
    ];

    return children(items);
};

export default MenuList;