import { Link } from 'react-router-dom'
import withFirebaseCollection from '../HOK/withFirebaseCollection'
import css from './userCabinet.module.css'






const BlockBusiness = ({data, userBd}) => {




  

    return(
        <div className={css.readerUserWrap}>
            {data.length > 0 &&
            <div className={css.readerUserWrapSmall}>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href='https://forms.gle/MGmQAvGpNksU6xS9A' target='_blanck'>Анкета бізнес-партнера/ перехід на гугл-форму/ в будь-який момент Ви можете її редагувати</a></h1>
                <p className={css.paragInWrapBig}>Актуалізуйте ваші дані в нашій базі партнерів. </p>
                <h1 className={css.aboutCompanyH1}>{data[0].personalManagerContact}</h1>
                <p className={css.paragInWrapBig}>{data[0].personalManager}</p>
                <h1 className={css.aboutCompanyH1}><Link className={css.aboutCompanyH1} to='/opt'>Прайс-гурт</Link></h1>
                <p className={css.paragInWrapBig}>Робіть ваше замовлення на сайті через меню — Прайс-гурт. Так швидше і зручніше нам і вам. Всі наявні книги перед вами, стисло, розсортовано за серіями, в кошик додається ваша знижка, зразу формується замовлення в 1С.</p>
                <h1 className={css.aboutCompanyH1}><a className={css.aboutCompanyH1} href='https://www.youtube.com/playlist?list=PLSrNOlkobNXlwwFLef7lW8MBb3nHW8ado' target='_black'>Перейти до плейлиста "Скрипти продажів книжок Час майстрів"</a></h1>
                <p className={css.paragInWrapBig}>Всі книги прочитати важко, а книгу, щоб продавати її. Що ж робити? — Пропонуємо вам відеоскрипти продажів кожної книги видавництва "Час майстрів". Прагнемо допомогти вам зорієнтуватися і зорієнтувати читача.</p>
                <h1 className={css.aboutCompanyH1}>Знижки</h1>
                <p className={css.paragInWrapBig}>{data[0].discount}</p>
                <h1 className={css.aboutCompanyH1}>Комерційни новини</h1>
                <p className={css.paragInWrapBig}>{data[0].news}</p>
                <h1 className={css.aboutCompanyH1}>Звернення видавництва</h1>
                <p className={css.paragInWrapBig}>{data[0].turnTo}</p>
                <h1 className={css.aboutCompanyH1}>Меседж до партнерів</h1>
                <p className={css.paragInWrapBig}>{data[0].message}</p>
                <h1 className={css.aboutCompanyH1}>Ваш акт звірки/ оновлюється 1 числа щомісячно</h1>
                <p className={css.paragInWrapBig}>{data[0].question}</p>
                <p className={css.paragInWrapBig}>{data[0].pdfTo}</p>
                <a className={css.pdfButton} href={`${userBd.pdfAct}`} target='_blanck'><div className={css.pdfButton}>Завантажити акт</div></a>
            </div>
            }
        </div>
    )
}
export default withFirebaseCollection('infoForMaister')(BlockBusiness)