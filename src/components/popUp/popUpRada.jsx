import { useEffect } from 'react'
import css from './popUp.module.css'




export default function PopUpRada({popupPosition, scrollHeight}) {


    useEffect(() => {
        const element = document.querySelector(`.${css.musicWrapOp}`);
    const computedStyles = window.getComputedStyle(element);
    console.log(computedStyles);
    element.style.top = `${scrollHeight+popupPosition-213}px`;
    }, []);

    return(
        <div className={css.musicWrapOp}>
<p className={css.mainPopP}>Опікун це читач, що зацікавився книгою і готовий єю пікуватися. Опікуватись - це як мінімум написати відгук про книгу, як максимум рекомендувати її іншим. Опікун отримує безоплатно електронну версію опікуванної книги; 40% знижки протягом року на будь яку кількість примірникив опікуванної книги; 40% на покупку будь якої книги видавництва; Слони за відгуки (Один слон можно обміняти при купівлі книги через сайт Час майстрів на 1 грн).</p>
        </div>
       
    )
}




