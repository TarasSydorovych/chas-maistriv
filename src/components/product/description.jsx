
import iconDownload from '../../img/downloadIcon.png'
import css from './product.module.css'






export default function Description() {


    return(
        <div className={css.descriptionWrapp}>
            <div className={css.realDescWrapp}>
                <div className={css.pidWrap}>
<div className={css.defLine}></div>
<p className={css.descP}>Вік: 8 - 13 років</p>
<p className={css.descP}>Мова: українська, англійська</p>
<p className={css.descP}>Жанр: оповідання</p>
<p className={css.descP}>Призначення: святкова, створює традиції, створює образи, для еволюції душі</p>
<p className={css.descP}>Фізичні характеристики: тверда, 232 стр, 205*240 мм, кольорова, 690 гр, українською, дизайн ЮА-студіо</p>
            </div>
            </div>
<div className={css.downloadIcon}>
<div className={css.iconDownload}>
<img src={iconDownload}/>
</div>
</div>

        </div>

    )
}