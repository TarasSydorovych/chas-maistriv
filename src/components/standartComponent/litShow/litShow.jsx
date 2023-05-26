import css from './litShow.module.css'

import kurluk from '../../../img/kurluk.png'




export default function LitShow() {




    return(
        <>
        <div className={css.umovaBlockWrap}>
            <img src={kurluk} className={css.kurlukSt}/>
<p className={css.umpvuP}>Умови проведення літшоу</p>
          </div>
          {/* блок умови проведення */}
          <div className={css.umWrap}>
            <div className={css.profesion}>
                <h1 className={css.profesionDescH1}>Для професійної публіки на конференціях і семінарах по всій Україні безкоштовно Поза Києвом</h1>
                <p className={css.profesionDescP}>Безоплатно, за умови участі понад 20 осіб.</p>
            </div>
            <div className={css.profButtonWrap}>
                <button className={css.buttonOrderProf}>Замовити</button>
                <button className={css.buttonOrderAdd}>Додати до переліку бажань</button>
            </div>
          </div>
            {/* блок умови проведення */}
            <div className={css.umWrap}>
            <div className={css.profesion}>
                <h1 className={css.profesionDescH1}>Для продавців книг по всій Україні безкоштовно Поза Києвом</h1>
                <p className={css.profesionDescP}>Безоплатно/обмеження тільки з урахуванням ресурсів автора.</p>
            </div>
            <div className={css.profButtonWrap}>
                <button className={css.buttonOrderProf}>Замовити</button>
                <button className={css.buttonOrderAdd}>Додати до переліку бажань</button>
            </div>
          </div>
            {/* блок умови проведення */}
            <div className={css.umWrap}>
            <div className={css.profesion}>
                <h1 className={css.profesionDescH1}>Для шкіл, садочків, батьків</h1>
                <p className={css.profesionDescP}>В Києві замовити книг на сумму 3000 грн</p>
                <p className={css.profesionDescP}>В Києві гонорар 1000 грн</p>
                <p className={css.profesionDescP}>Поза Києвом замовити книг на сумму 6000 грн</p>
                <p className={css.profesionDescP}>Поза Києвом гонорар 2000 грн</p>
            </div>
            <div className={css.profButtonWrap}>
                <button className={css.buttonOrderProf}>Замовити</button>
                <button className={css.buttonOrderAdd}>Додати до переліку бажань</button>
            </div>
          </div>
          <div className={css.lite}></div>
          </>
    )
}