import css from './info.module.css'
import srvd from '../../img/aboutPic.png'





export default function AboutComp() {





    return(
        <div className={css.aboutWrapAll}>
            <div className={css.smallWrapAbout}>
                <h1 className={css.aboutCompanyH1}>Про видавництво</h1>
                <div className={css.wpaPicAbout}>
                    <p className={css.paragInWrap}>
                    Видавницво <span className={css.aboutSpan}>Час Майстрів</span> представлена на ринку дитячої літератури України вже <span className={css.aboutSpan}>понад 16 років.</span> Але понад 20 років потому ми вже стрясали ринок навчальної літератури своїми книжковими ноу-хау. Видавництво «Час майстрів» прагне створювати інноваційні книги, які допомагають дітям еволюціонувати. Книги, від яких дітям важко відірватися, є для нас необхідною, але не достатньою умовою.
                    </p>
                    <div className={css.imgAboutWrap} >
                        <img src={srvd} className={css.imgAbout}/>
                    </div>
                </div>
                <p className={css.paragInWrapBig}>Створювати книги, що ґрунтуються на ноу-хау – це те, що ми любимо робити. Працюємо над створенням художньої літератури, енциклопедій. І ми вже почали працювати над навчальною книгою та нон-фікшн. Маємо на меті випуск лише високоякісних книжок, як витворів мистецтва, для читачів більш ніж одного покоління, рідна мова яких не тіільки українська.</p>
            </div>
        </div>
    )
}
