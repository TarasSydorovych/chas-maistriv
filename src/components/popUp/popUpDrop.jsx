// import css from './popUp.module.css'

// export default function PopUpDrop() {

//     return(
//         <div className={css.dropPopWrap}>
// <p className={css.mainPopP}>Ми підтримуємо дропшипінг і працюємо над створенням сервісу. Для нас це прототип нової культури продажів. Ми беремо на себе всі операції з товарами та забезпечуємо промо текстами й картинками, ваше завдання – шукати покупців. Всі умови індивідуальні. Порядок процедури: обговорюєте умови з Лесею Кухарчук (<a href="tel:+380672315737" >+38 067 2315737</a> <a href="mailto:sales@chasmaistriv.com.ua">sales@chasmaistriv.com.ua</a>); реєструєтесь зі статусом "Дропшипінг"; зручний сервіс замовлення на сайті в розділі "Прайс-гурт", зручний довіз, звіти.</p>
//         </div>

//     )
// }
import React from "react";
import css from "./popUp.module.css";

const PopUpDrop = React.forwardRef((props, ref) => {
  return (
    <div className={css.dropPopWrap} ref={ref}>
      <p className={css.mainPopP}>
        Ми підтримуємо дропшипінг і працюємо над створенням сервісу. Для нас це
        прототип нової культури продажів. Ми беремо на себе всі операції з
        товарами та забезпечуємо промо текстами й картинками, ваше завдання –
        шукати покупців. Всі умови індивідуальні. Порядок процедури: обговорюєте
        умови з Лесею Кухарчук (<a href="tel:+380672315737">+38 067 2315737</a>
        <a href="mailto:sales@chasmaistriv.com.ua">sales@chasmaistriv.com.ua</a>
        ); реєструєтесь зі статусом "Дропшипінг"; зручний сервіс замовлення на
        сайті в розділі "Прайс-гурт", зручний довіз, звіти.
      </p>
    </div>
  );
});

export default PopUpDrop;
