import css from './product.module.css'




export default function HeroPage() {




    return(
        <div className={css.heroPageWrap}>
         <div className={css.heroPageWrapSmall}>
            <div className={css.heroDesc}>
            "...поспішиш — людей насмішиш. Ось і насмішив... до сліз горючих. Що називається, поїхав би ускач, ан сиди та плач. Але Ілля не плакав. Його батечко змалку вчив, що сльозами горю не допоможеш." «Рало тягаю не задля зарядки, а для порядку...» — любив приказувати він, всаджуючи твердою, як підошва, долонею цвях у кленовий стовбур. . Молитва його була простою: «Господи, помилуй!» . Правда, бити байдики вдавалося не часто, тому що в доброго господаря і каліці знайдеться робота.
            <div className={css.hvistBig}></div>
            </div>
            <button className={css.heroButton}>Сторінка героя</button>
         </div>
       

        </div>

    )
}