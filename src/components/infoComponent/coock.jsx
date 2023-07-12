import css from './info.module.css'





export default function Coock({setCoock}) {




    return(
        <div className={css.coockWrap}>
            <p className={css.coockieP}>Ми просимо вашого схвалення
Ми розмістили файли cookie, технології відстеження та аналізу на нашому вебсайті, щоб забезпечити вам найкращу функціональність. Вони є технічно та функціонально необхідними або слугують для статистичних і рекламних цілей, наприклад. аналізу, відстеження, вимірювання результатів і діапазону зацікавлень читачів. Крім того, ми використовуємо послуги сторонніх постачальників для інтеграції медіаконтенту, напр. відео або карт. Ви вирішуєте, на які файли cookie та технологію ви погоджуєтеся. Ваш вибір можна будь-коли змінити в цих налаштуваннях.</p>
     <div className={css.buttonCoockieWrap}>
        <button onClick={() => setCoock(false)} className={css.firstButtonCoocki}>Прийняти</button>
        <button className={css.secondButtonCoocki}>Відхилити</button>
     </div>
        </div>
    )
}