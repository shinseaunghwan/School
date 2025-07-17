import React, { useContext, useRef, useEffect } from "react";
import { WidgetContext } from "../../app/(main)/main/template5/App";
import Image from "next/image";

// 메인비주얼
export default function MainVisual() {
  const widget = useContext(WidgetContext);
  const imgRef = useRef(null); // 이미지 요소 참조
  const mapRef = useRef(null); // map 요소 참조

  // 이미지 맵 좌표 업데이트 함수
  const updateMapCoords = () => {
    const img = imgRef.current;
    const map = mapRef.current;
    if (!img || !map) return;

    const areas = map.getElementsByTagName("area");
    const originalWidth = 710;
    const originalHeight = 689;

    const currentWidth = img.clientWidth;
    const currentHeight = img.clientHeight;

    const widthRatio = currentWidth / originalWidth;
    const heightRatio = currentHeight / originalHeight;

    for (let area of areas) {
      const originalCoords = area.getAttribute("data-coords");
      if (!originalCoords) continue;

      const coordsArray = originalCoords.split(",").map(Number);
      const scaledCoords = coordsArray.map((coord, index) =>
        Math.round(coord * (index % 2 === 0 ? widthRatio : heightRatio))
      );

      area.setAttribute("coords", scaledCoords.join(","));
    }
  };

  // 이미지 변경 및 이벤트 핸들러 설정
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !imgRef.current) return;

    const areas = map.querySelectorAll("area");

    const updateMapImage = (area) => {
      const id = area.dataset.id.replace("map", ""); // 'map1' -> '1'
      imgRef.current.src = `/images/template/T0005/main/mapImg_${id.padStart(
        2,
        "0"
      )}.png`; // 동적으로 파일 이름 생성
    };

    const restoreMapImage = () => {
      imgRef.current.src = "/images/template/T0005/main/mapImg.png"; // 기본 이미지로 복원
    };

    // 각 area에 이벤트 리스너 추가
    areas.forEach((area) => {
      area.addEventListener("mouseenter", () => updateMapImage(area));
      area.addEventListener("focus", () => updateMapImage(area));
      area.addEventListener("mouseleave", restoreMapImage);
      area.addEventListener("blur", restoreMapImage);
    });

    // 초기 좌표 업데이트
    updateMapCoords();

    // 리사이즈 이벤트 핸들러
    window.addEventListener("resize", updateMapCoords);

    // cleanup
    return () => {
      areas.forEach((area) => {
        area.removeEventListener("mouseenter", () => updateMapImage(area));
        area.removeEventListener("focus", () => updateMapImage(area));
        area.removeEventListener("mouseleave", restoreMapImage);
        area.removeEventListener("blur", restoreMapImage);
      });
      window.removeEventListener("resize", updateMapCoords);
    };
  }, []);

  return (
    <>
      <div className={widget.mVisual}>
        <div className={widget.contLeft}>
          <div className={widget.mainTxt}>
            <div className={widget.imgWrap}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/images/template/T0005/main/slogun_img.png"
                alt=""
              />
            </div>
            <div className={widget.txtWrap}>
              <h1>부산 통합예약포털</h1>
              <p>예약가능한 서비스를 한눈에!</p>
            </div>
          </div>
          <div className={widget.schoolSrch}>
            <div className={widget.resveSrch}>
              <form id="resveSrch">
                <h3 className={widget.titWrap}>
                  <span>예약검색</span> 서비스
                </h3>
                <div className={widget.selectWrap}>
                  <div className={`${widget.selectItem} ${widget.on}`}>
                    <select>
                      <option>유아/학생</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div className={widget.selectItem}>
                    <select>
                      <option>학부모/일반</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div className={widget.selectItem}>
                    <select>
                      <option>교직원</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div className={widget.selectItem}>
                    <select>
                      <option>기관(학교)</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                </div>
                <div className={widget.buttonWrap}>
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    id="resveSrchValue"
                    name="resveSrchhValue"
                    title="검색어를 입력해주세요"
                  />
                  <a href="" title="학교검색 버튼">
                    <i className="ri-search-line" aria-hidden="true"></i>
                  </a>
                </div>
              </form>
            </div>
            <div className={widget.resveQuick}>
              <form id="resveQuick">
                <h3 className={widget.titWrap}>
                  <span>빠른예약</span> 서비스
                </h3>
                <div className={widget.selectWrap}>
                  <div className={`${widget.selectItem} ${widget.on}`}>
                    <select>
                      <option>견학체험</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div className={widget.selectItem}>
                    <select>
                      <option>지역구 선택</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div className={widget.selectItem}>
                    <select>
                      <option>기관 선택</option>
                    </select>
                    <p>
                      <i
                        className="ri-arrow-down-s-line"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                </div>
                <div className={widget.buttonWrap}>
                  <a href="" title="학교검색 버튼">
                    해당조건으로 검색하기
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={widget.mapImg}>
          <img
            src="/images/template/T0005/main/mapImg.png"
            ref={imgRef}
            useMap="#imageMap"
            id="mapMap"
            alt="부산지도"
          />
          <map ref={mapRef} name="imageMap" id="imageMap">
            <area
              data-id="map1"
              target=""
              alt="기장군"
              title="기장군"
              href="#"
              data-coords="427,140,432,117,452,100,446,85,460,69,456,55,463,49,487,47,507,63,521,63,539,55,550,42,547,29,540,18,552,10,599,18,610,9,625,6,636,8,645,17,653,27,662,36,663,47,659,55,666,65,661,78,668,86,683,87,697,100,703,117,697,130,677,135,653,127,642,129,637,165,633,177,633,187,633,205,631,234,621,274,610,289,623,332,621,350,606,350,578,344,573,347,564,336,565,317,553,318,551,327,542,332,534,330,534,320,513,316,503,305,501,293,515,270,500,259,496,241,483,238,474,217,449,219,455,200,453,152,438,149"
              shape="poly"
            />
            <area
              data-id="map2"
              target=""
              alt="금정구"
              title="금정구"
              href="#"
              data-coords="370,160,375,168,382,166,399,148,427,143,436,149,453,152,454,199,448,220,474,218,482,237,483,253,471,273,451,286,448,297,433,306,412,298,400,294,390,286,365,282,361,272,349,270,345,241,336,223,350,202,346,187,355,167"
              shape="poly"
            />
            <area
              data-id="map3"
              target=""
              alt="해운대구"
              title="해운대구"
              href="#"
              data-coords="483,239,496,241,500,259,514,270,500,295,502,304,512,316,533,320,534,330,542,333,551,328,552,319,564,317,563,333,572,348,571,359,568,370,558,371,542,383,528,382,507,390,472,387,460,363,442,345,439,327,441,313,436,305,448,298,451,285,470,274,484,254"
              shape="poly"
            />
            <area
              data-id="map4"
              target=""
              alt="북구"
              title="북구"
              href="#"
              data-coords="327,190,331,196,339,190,345,189,348,201,335,223,344,241,348,271,360,274,365,284,343,318,308,338,263,326,277,298,270,267,286,244,294,220,298,198,315,188"
              shape="poly"
            />
            <area
              data-id="map5"
              target=""
              alt="동래구"
              title="동래구"
              href="#"
              data-coords="344,319,366,283,390,287,399,295,432,307,437,304,441,314,438,328,441,339,431,338,406,323,378,323,363,335"
              shape="poly"
            />
            <area
              data-id="map6"
              target=""
              alt="연제구"
              title="연제구"
              href="#"
              data-coords="343,319,362,336,371,330,376,324,405,324,430,339,440,340,441,346,446,350,432,355,421,350,417,361,416,372,410,382,399,385,399,368,391,360,379,361,369,345,361,347,350,340"
              shape="poly"
            />
            <area
              data-id="map7"
              target=""
              alt="수영구"
              title="수영구"
              href="#"
              data-coords="400,386,412,382,417,373,418,362,421,352,432,356,446,351,454,359,463,369,471,388,463,400,455,400,444,403,451,426,443,426,432,421,427,408,426,396,419,388"
              shape="poly"
            />
            <area
              data-id="map8"
              target=""
              alt="사상구"
              title="사상구"
              href="#"
              data-coords="262,326,256,334,245,346,225,394,228,439,241,451,250,459,260,455,267,444,283,444,287,429,297,419,305,419,310,397,301,389,302,365,315,358,313,345,308,339"
              shape="poly"
            />
            <area
              data-id="map9"
              target=""
              alt="부산지구"
              title="부산지구"
              href="#"
              data-coords="309,339,342,320,349,340,360,348,369,346,378,362,391,361,398,369,399,391,392,395,392,401,376,404,372,417,358,415,348,404,340,404,339,418,322,429,306,419,312,397,302,389,303,366,316,358,314,344"
              shape="poly"
            />
            <area
              data-id="map10"
              target=""
              alt="남구"
              title="남구"
              href="#"
              data-coords="377,405,393,402,393,396,400,392,400,386,419,389,425,396,426,408,431,421,442,427,451,427,458,435,463,445,464,474,455,484,439,480,428,489,411,487,401,473,379,471,372,454,375,447,371,419"
              shape="poly"
            />
            <area
              data-id="map11"
              target=""
              alt="서구"
              title="서구"
              href="#"
              data-coords="284,445,287,431,298,419,307,420,320,429,328,438,328,462,314,476,313,484,328,499,328,506,317,564,308,567,304,542,298,535,299,521,306,508,306,493,301,485,303,477,306,470"
              shape="poly"
            />
            <area
              data-id="map12"
              target=""
              alt="동구"
              title="동구"
              href="#"
              data-coords="322,430,340,419,341,406,347,405,356,415,371,418,374,445,371,454,356,461,353,472,345,466,338,460,329,461,329,437,326,435"
              shape="poly"
            />
            <area
              data-id="map13"
              target=""
              alt="중구"
              title="중구"
              href="#"
              data-coords="315,476,330,462,339,462,357,477,350,486,329,499,314,485"
              shape="poly"
            />
            <area
              data-id="map14"
              target=""
              alt="영도구"
              title="영도구"
              href="#"
              data-coords="329,501,350,487,359,477,382,485,404,508,414,513,412,522,406,530,426,543,430,554,423,563,407,566,379,542,363,538,345,517"
              shape="poly"
            />
            <area
              data-id="map15"
              target=""
              alt="사하구"
              title="사하구"
              href="#"
              data-coords="227,440,217,456,203,463,192,481,187,498,190,509,197,509,201,513,211,508,219,499,227,499,222,533,238,588,247,595,261,594,264,576,266,568,258,553,263,550,276,568,290,572,300,565,307,566,304,542,297,535,298,525,305,508,305,495,300,487,305,470,283,446,267,445,262,455,250,461"
              shape="poly"
            />
            <area
              data-id="map16"
              target=""
              alt="강서구"
              title="강서구"
              href="#"
              data-coords="268,267,243,276,205,279,190,283,176,295,169,287,163,287,155,293,126,298,112,317,109,326,112,334,120,338,127,352,124,362,108,361,107,368,118,377,120,387,113,398,117,405,110,407,105,398,111,388,109,379,100,378,89,386,72,385,67,396,61,396,50,396,43,392,29,391,8,393,7,410,36,436,57,438,59,453,71,466,69,475,62,482,48,484,46,491,47,503,31,523,8,530,0,546,2,595,38,668,57,681,77,678,85,671,91,650,100,647,99,635,99,619,105,612,105,586,102,576,103,551,119,549,130,554,147,560,168,558,173,545,183,537,189,508,186,498,196,473,201,465,206,460,216,455,227,438,223,396,240,355,244,344,261,326,276,298"
              shape="poly"
            />
          </map>
          <div className={widget.mapTxtWrap}>
            <p>
              지도에서 지역구를 클릭하시면
              <br />
              해당 <span>지역 프로그램</span>으로 이동합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
