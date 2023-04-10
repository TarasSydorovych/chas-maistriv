import css from './product.module.css'



export default function WhyNeedRead() {


    return(
<div className={css.whyNeedWrapp}>

<div className={css.whyNeedWrappSmall}>
<h2 className={css.whyNeedH2}>Чому варто читати цю книгу? </h2>
<div className={css.whyNeedBlock}>
    <div className={css.blockWhy}>
    Про Іллю Муромця поголос народа був настільки сильний, що без записів, з уст в уста згадка про нього передавалася 500 років. А перша письмова згадка написана київським шляхтичем Філоною Кмітою тільки у 1574 році. 500 років люди співали про нього пісні. Той і тобі треба знати, що це за легень. У кого і величні пращури, тому є чим пишатися і той впевнініше себе почуває у сучасному світі.
    </div>
    <div className={css.blockWhy}>
    Це унікальна повість, що поєднала в собі письменицький талант вживити читача в героя і в історичне середовище, билинні події, наукові історичні реконструкції і християнські чесноти.
    </div>
    <div className={css.blockWhy}>
    На чому виховувати справжніх чоловіків, нащадків козарлюг? Кмітливих, непримхливих, невередливих, служащих своїй лобові, з вірою в серці, витривалих, міцних духом, потужних тілом! Богатир - наше слово. Воно повинно матеріалізовуватись в наших синам. Відстоюємо свої цінності
    </div>
</div>
<div className={css.wrapRecent}>
<div className={css.startText}>
    <div className={css.startTextFirst}>
    Прочитати приклад тексту
    </div>
    <div className={css.startTextSecond}>
    Рецензія психолога
    </div>
    <div className={css.startTextThree}>
    Рецензія мовознавзя
    </div>
</div>
<div className={css.startText}>
    <div className={css.startTextSecondFirst}>
    Рецензія критика
    </div>
    <div className={css.startTextSecondSecond}>
    Рецензія історика
    </div>
</div>


</div>
</div>


</div>

)
}