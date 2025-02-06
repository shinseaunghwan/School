import React from 'react';
import Title from "./Title"
import IconBtnMore from "./IconBtnMore"

export default function MainMeal() {
  const Items = [
    { meal: '중식', kcal: '1229 Kcal', menu: "미트소스스파게티, 크림스프, 교촌식윙, 야채샐러드&키위D, 오이피클, 깍두기, 오렌지에이드", id: 13241 },
    { meal: '석식', kcal: '1229 Kcal', menu: "미트소스스파게티, 크림스프, 교촌식윙, 야채샐러드&키위D, 오이피클, 깍두기, 오렌지에이드", id: 87652 },
  ];

  return (
    <div className="meal_menu0002">
      <Title className="heading">오늘의 식단</Title>
      <div className="inner">
        <ul>
          {Items.map((item) => (
            <li key={item.id}>
              <dl>
                <dt className="kcal"><span>{item.meal} <em>{item.kcal}</em></span></dt>
                <dd className="meal_list">
                  {item.menu}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
        <img src="../../images/template/T0002/main/0002_img_meal.png" alt=""/>
      </div>
      <IconBtnMore LinkHref={''} LinkClassName={'btn_more ty'} IconClassName={'xi-plus'} LinkTitle={'식단'} />
    </div>
  )
}