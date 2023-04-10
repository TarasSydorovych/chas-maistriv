import css from './product.module.css'
import hero from '../../img/hero.png'


export default function Hero() {




    return(
       <div className={css.heroWrapp}>
<div className={css.heroPicRo}>
<div className={css.heroPicRoteta}>
<img src={hero} />

</div>
</div>

<div className={css.wrapHeroText}>
    <h1 className={css.wrapHeroTextH1}>
    Головний герой Богатир
    </h1>
    <p className={css.wrapHeroTextP}>
        Ілля Муромець до 33 років був поралізований. Вірив в Бога і молився: "Спаси і збереги". Волхви сказали встань і принеси нам води, він повірив і пішов. Віра пробудила в герої небачену силу. Ілля пішов по життю і бачив не справедливість, жадібність, насилля. Він використовував свою силу, щоб захистити скривдленних, відновити справеливість. Ілля відмовився від особистого збагачення і від володінь і від влади. Ілля допомогав і залишався аскетом. Зі скарбом важко рухатись за межі познаного, відкривати нове - істині потреби справжніх чоловіків. Свій вік Ілля закінчив монахом, віддавшись особистому прссвітленню, як це пізніше робили українські Козаки. Знання свого пращура дає сили людям які називають себе українцями.
    </p>

</div>

       </div>

    )
}