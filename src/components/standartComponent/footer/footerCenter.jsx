import { Link } from "react-router-dom";



export default function FooterCenter() {



    return(
        <div className="footerWrapperCenter">
            <div className="wrapCenterFirst">
              <ul className="centerFirstUlF">
               <li className="centerFirstLi"><Link to="/about" className="centerFirstLi">Про видавництво</Link> </li>
               <li className="centerFirstLi"><Link to="/about" className="centerFirstLi">Контакти</Link></li>
               <li className="centerFirstLi">Доставка</li>
               <li className="centerFirstLi">Самовивіз</li>
               <li className="centerFirstLi">Клуб ЧМ</li>
              </ul>
              <ul className="centerFirstUlS">
              <li className="centerFirstLi">Де пощупати наші книги</li>
               <li className="centerFirstLi">Публічна оферта</li>
               <li className="centerFirstLi">Книги ЧМ на АМАЗОН</li>
               <li className="centerFirstLi"><a className="centerFirstLi" target='_blanck' href="https://www.facebook.com/baarnabus/shop/%D0%A7%D0%B0%D1%81-%D0%9C%D0%B0%D0%B9%D1%81%D1%82%D1%80%D1%96%D0%B2-1193846147677425/?ref_code=mini_shop_profile_plus_shop_tab_cta&ref_surface=mini_shop_storefront"> Книги ЧМ в Європі</a></li>
               
              </ul>

            </div>
            <div className="wrapCenterSecond">
            
              <ul className="centerSecondUlSF">
               <li className="centerSecondLi">Ви хочете стати нашим партнером, замовте договір</li>
               <li className="centerSecondLi">Прайс - замовлення - гурт</li>
               <li className="centerSecondLi">СП/ Корпоротивні/ групу</li>
              </ul>

              <ul className="centerSecondUlS">
               <li className="centerSecondLi">Ви хочете закупити на клас? </li>
               <li className="centerSecondLi">Скачати каталог</li>
               <li className="centerSecondLi">Скачати прайс</li>
               <li className="centerSecondLi">Підтримка бібліотек і бібліотекарів</li>
               
              </ul>

            
            </div>
        </div>
    )
}