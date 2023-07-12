import { Link } from 'react-router-dom'
import withFirebaseCollection from '../HOK/withFirebaseCollection'
import css from './userCabinet.module.css'






const BlockMaister = ({data, userBd}) => {




  

    return(
        <div className={css.readerUserWrap}>
            {data.length > 0 &&
            <div className={css.readerUserWrapSmall}>
                <h1 className={css.aboutCompanyH1}>Анкета Автора/ перехід на гугл-форму/ в будь-який момент Ви можете її редагувати</h1>
                <p className={css.paragInWrapBig}>{data[0].updateData}</p>
                <h1 className={css.aboutCompanyH1}>Анкета майстра (художника, типографіка, дизайнера, редактора, психолога, наукового редактора, критика) для публікації сторінки на сайті/ перехід на гугл-форму/ в будь-який момент Ви можете її редагувати</h1>
                <p className={css.paragInWrapBig}>{data[0].anketMaister}</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href='mailto:vredaktor@chasmaistriv.com.ua'>vredaktor@chasmaistriv.com.ua</a></h1>
                <p className={css.paragInWrapBig}>{data[0].personalManager}</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href='mailto:origin@chasmaistriv.com.ua'>Подати рукопис на розгляд/перехід на email</a></h1>
                <p className={css.paragInWrapBig}>{data[0].submitManuscript}</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href='' target='_blanck'>Публікація рукопису на сайті з метою дослідження/перехід до гугл-форми з анкетою рукопису</a></h1>
                <p className={css.paragInWrapBig}>{data[0].manuscript}</p>
                <h1 className={css.aboutCompanyH1}>Ви можете допомогти авторам/до каталогу рукописів</h1>
                <p className={css.paragInWrapBig}>{data[0].helpAutor}</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href={`${data[0].opikunForm}`} target='_blanck'>Подати заявку до опікунської ради</a></h1>
                <p className={css.paragInWrapBig}>{data[0].opicunText}</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href={`${data[0].searchAutor}`} target='_blanck'>Шукаємо автора (перехід на гугл-форму з анкетою)</a></h1>
                <p className={css.paragInWrapBig}>{data[0].searchAutorText}</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href='https://t.me/chas_maistriv' target='_blanck'>Підписатися на телеграм-канал "Час майстрів"</a></h1>
                <p className={css.paragInWrapBig}>{data[0].tgChanelText}</p>
          
            </div>
            }
        </div>
    )
}
export default withFirebaseCollection('infoBusiness')(BlockMaister)