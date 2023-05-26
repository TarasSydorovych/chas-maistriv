import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from './hero.module.css'
import arrowImp from '../../img/arrowDownPick.png'
import authPic from '../../img/illa.png'
import arrowLeft from '../../img/arrowInHerpLeft.png'
import arrowRight from '../../img/arrowInHeroRight.png'
import autorPic from '../../img/productAutorPic.png'
import ProductForHero from "./productForHero";
import YouTube from 'react-youtube';
import kurluk from '../../img/kurluk.png'
import LitShow from "../standartComponent/litShow/litShow";
export default function HeroPage() {






    return(
        <div>
            <Header/>
            <div className={css.allBooksWrap}>
                <div className={css.allHero}>
                    <p className={css.yourPerfectHero}>Ваші улюблені герої книг<br/><span className={css.yourPerfectHeroSpan}>переймай найкраще від улюблених персонажів</span></p>
                    <div className={css.ageWrap}>
                        <p className={css.children}>Дитині</p>
                        <div className={css.chousBooksSelect}>
  <select className={css.customSelect} >
    <option className={css.customOpin} value="0">Країна</option>
    <option className={css.customOpin} value="1">Україна</option>
   
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
                    </div>
                </div>


                <div className={css.autorListSmal}>

                <div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>Ілля<br/>Муромець</p>
           </div>
           <div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>Ілля<br/> Муромець</p>
           </div>
           <div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>Ілля<br/> Муромець</p>
           </div>
           <div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>Ілля<br/> Муромець</p>
           </div>
           <div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>Ілля<br/> Муромець</p>
           </div>
           <div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           <p className={css.autorNameM}>Ілля<br/> Муромець</p>
           </div>
           
           
</div>
<div className={css.arrowWrap}>
                <img src={arrowLeft} className={css.arrowLeftSt}/>
                <img src={arrowRight} className={css.arrowRightSt}/>
            </div>
            </div>
            {/* наступний пункт велике фото героя + опис */}

          <div className={css.wrapHeroBigFoto}>
<div className={css.wrapHeroBigFotoTwo}>
<div className={css.imgAutorWrapBig}>
                   <img src={authPic} className={css.imgAutorBig}/>
                   </div>
           <div className={css.descHeroOP}>
            <h1 className={css.heroName}>Ілля Муромець</h1>
            <div className={css.descrWithDot}>
<div className={css.dot}></div>
<p className={css.dotP}>богатир, найсильніший</p>
            </div>
            <div className={css.descrWithDot}>
            <div className={css.dot}></div>
            <p className={css.dotP}>переміг багато нечисті</p>
            </div>
            <p className={css.whatBook}>герой книги Юрія Лигуна “Булава Іллі Муромця”</p>
            <button className={css.buttonHeroo}>Перейти до книги</button>
          </div>
</div>
{/* жовтий блок */}
<div className={css.yellowFitchWrap}>
    <p className={css.yellowFitchWrapP}>«Рало тягаю не задля зарядки, а для порядку...» — любив приказувати він, всаджуючи твердою, як підошва, долонею цвях у кленовий стовбур.</p>
<div className={css.hvist}></div>
</div>
{/* блок автора */}

<div className={css.comentAutorWrap}>
<div className={css.autorPicWrap}>
<div className={css.autorPic}>
<div className={css.autorPicRotate}>
<img src={autorPic} />

</div>
</div>
<h3 className={css.autorNameInComment}>
Автор про героя<br/><span className={css.autorNameInCommentSpan}>Юрій Лігуна</span> 
</h3>
</div>
<div className={css.commentAndMoreWrapp}>
<p className={css.comment}>«Рало тягаю не задля зарядки, а для порядку...» — любив приказувати він, всаджуючи твердою, як підошва, долонею цвях у кленовий стовбур.</p>
<h3 className={css.moreBooks}>Ще книги автора</h3>

</div>



                </div>
{/* закінчення блок автора */}
{/* блок історії */}
<div className={css.historiCreateBlock}>
    <h3 className={css.hictoryH3}>Історія створення</h3>
    <p className={css.hictoryP}>
    Батьки, Ви виховуєте майбутніх програмістів, які (за Вашими сподіваннями) будуть на верхівці харчової піраміди у найближчому сторіччі? Ви зрощуєте розумниць і розумників, які вже читають, пишуть, розмовляють англійською ще до школи? Ви прагнете, щоб діти краще розвивались? У якому напрямку ви бажаєте розвитку своїм дітям? Дитинство — час коли в людині визріває її осердя. Те незриме, що стане провідною зіркою на все життя. Сплячі батьки, пробудіться та допоможіть своїм дітям знайти їхнє осердя та зміцнити його. Все має центр: планети крутяться навколо Сонця, в клітинах є ядро, в атомів також є ядро, має бути воно й у людини. То де ж це осердя? Поміркуймо разом: навколо чого крутиться людина? Не теоретично, а емпірично (спостерігаючи за собою) я помітив, що центр людини в її зацікавленнях. Дії, думки, органи чуття людини крутяться навколо того, що її захоплює. Якщо у дитини немає захоплення, їй нудно. Лінощів не існує, як немає й темряви. Темрява — це відсутність світла, а лінь — це відсутність зацікавлення. 
    </p>
</div>
{/* блок інтервю */}
<div className={css.blockInturv}>
    <div className={css.blockInturvSmall}>
<h3 className={css.inturvH3}>Інтерв’ю з героєм</h3>
<p className={css.inturvP}>
– Яка Ваша улюблена книга, чому саме вона? Пише зазвичай з іронією та не дуже любить мандрувати вигаданими світами. Переважно дії в його творах відбуваються «тут» і «тепер», герої — сучасні дітлахи (але інколи — пінгвіни чи навіть Діди Морози). Він не є публічною особою, не намагається активно рекламувати свою творчість, але вже чверть століття його тексти читають і люблять діти різного віку — від малечі до підлітків. ПОТРІБНО ДОПИСАТИ ВІДПОВІДЬ 
    </p>
    <p className={css.inturvP}>
    – Ким Вихотіли стати у дитинстві? Пише зазвичай з іронією та не дуже любить мандрувати вигаданими світами. Переважно дії в його творах відбуваються «тут» і «тепер», герої — сучасні дітлахи (але інколи — пінгвіни чи навіть Діди Морози). Він не є публічною особою, не намагається активно рекламувати свою творчість, але вже чверть століття його тексти читають і люблять діти різного віку — від малечі до підлітків. ПОТРІБНО ДОПИСАТИ ВІДПОВІДЬ 
    </p>
    </div>
</div>

          </div>

{/* блок товарів */}
          <div className={css.theSameBooksWrap}>
            <div className={css.theSameBooksWrapSmall}>
                <h4 className={css.theSameH4}>Схожі книги</h4>
                <div className={css.smallBookLikeWrap}>
                <ProductForHero/>
                <ProductForHero/>
                <ProductForHero/>
                </div>
            </div>
          </div>
          {/* блок товарів */}
          {/* блок відео */}
          <div className={css.videoBlockWrap}>
            <div className={css.videoBlockWrapSmall}>
                <h4 className={css.seeBook}>Огляд книги</h4>
                <div className={css.video}>
<YouTube videoId="rg-wgk2_4FQ" opts={{ width: '1193.03px', height: '714.56px' }} />
</div>
            </div>
          </div>
          {/* блок відео */}
          {/* блок умови проведення */}
         <LitShow/>
          
            <Footer/>
        </div>
    )
}