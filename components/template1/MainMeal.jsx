import React from 'react';
import Title from "./Title"
import IconBtnMore from "./IconBtnMore"
export default function MainMeal({widget}) {
  const Items = [
    { meal: '중식', kcal: '1229 Kcal', menu: "미트소스스파게티, 크림스프, 교촌식윙, 야채샐러드&키위D, 오이피클, 깍두기, 오렌지에이드", id: 1 },
    { meal: '석식', kcal: '1229 Kcal', menu: "미트소스스파게티, 크림스프, 교촌식윙, 야채샐러드&키위D, 오이피클, 깍두기, 오렌지에이드", id: 2 },
  ];

  return (
    <div className={widget.meal_menu0030}>
      <Title className={widget.heading2}>오늘의 식단</Title>
      <div className={widget.inner}>
        <ul>
          {Items.map((item) => (
            <li key={item.id}>
              <dl>
                <dt><span>{item.meal}</span></dt>
                <dd className={widget.meal_list}>
                  <span className={widget.kcal}>{item.kcal}</span>
                  <p>{item.menu}</p>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </div>
      <IconBtnMore LinkHref={''} LinkClassName={widget.btn_more} IconClassName={'xi-plus'} LinkTitle={'식단'} />
    </div>
  )
}