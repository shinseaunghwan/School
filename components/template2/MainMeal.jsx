import React from 'react';
import Title from "./Title"
import IconBtnMore from "./IconBtnMore"
import Image from 'next/image';
export default function MainMeal({widget}) {
  const Items = [
    { meal: '중식', kcal: '1229 Kcal', menu: "미트소스스파게티, 크림스프, 교촌식윙, 야채샐러드&키위D, 오이피클, 깍두기, 오렌지에이드", id: 1 },
    { meal: '석식', kcal: '1229 Kcal', menu: "미트소스스파게티, 크림스프, 교촌식윙, 야채샐러드&키위D, 오이피클, 깍두기, 오렌지에이드", id: 2 },
  ];

  return (
    <div className={widget.meal_menu0002}>
      <Title className={widget.heading}>오늘의 식단</Title>
      <div className={widget.inner}>
        <ul>
          {Items.map((item) => (
            <li key={item.id}>
              <dl>
                <dt className={widget.kcal}><span>{item.meal} <em>{item.kcal}</em></span></dt>
                <dd className={widget.meal_list}>
                  {item.menu}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
        <Image src="/images/template/T0002/main/0002_img_meal.png" alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
        
      </div>
      <IconBtnMore LinkHref={'#'} LinkClassName={`${widget.btn_more} ${widget.ty}`} IconClassName={'xi-plus'} LinkTitle={'식단'} />
    </div>
  )
}