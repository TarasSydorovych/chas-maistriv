import Footer from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import css from './priceOpt.module.css'
import optBirdFirst from '../../img/optBirdFirst.png'
import optBirdSecond from '../../img/optBirdSecond.png'
import optBirdTherd from '../../img/optBirdThre.png'
import optBirdFour from '../../img/optBirdFour.png'
import optBirdFive from '../../img/optBirdFive.png'
import optBirdSix from '../../img/optBirdSix.png'
import arrowBirdOpt from '../../img/arrowBirdOpt.png'
import saleNewOne from '../../img/saleNewOne.png'
import saleNewTwo from '../../img/saleNewTwo.png'
import saleThreBlock from '../../img/saleThreBlock.png'
import rotatePic from '../../img/rotatePic.png'
import notRotatePic from '../../img/notRotatePic.png'
import soonPicProd from '../../img/soonPicProd.png'
import ProductInOpt from './productInOpt'
import LitShow from '../standartComponent/litShow/litShow'
export default function PriceOpt() {





    return(
        <div>
            <Header/>
            {/* Верхній блок з пташками */}
<div className={css.titleWrap}>
    <h3 className={css.h3Title}>На цій сторінці зручно робити гуртові замовлення</h3>
    <div className={css.birdWrapFirst}>
        <div className={css.birdWrap}>
<img src={optBirdFirst}/>
<p className={css.birdPDesc}>В графі “замовлення” проставте кількість </p>
</div>
<img src={arrowBirdOpt} className={css.arrowBirdOptSt}/>
<div className={css.birdWrap}>
<img src={optBirdSecond}/>
<p className={css.birdPDesc}>В кінці прайсу тицьніть на кнопку “замовити” і в кошик буде додано одразу всі книги, навпроти яких у графі “замовлення” стоїть цифра</p>
</div>
<img src={arrowBirdOpt} className={css.arrowBirdOptSt}/>
<div className={css.birdWrap}>
<img src={optBirdTherd}/>
<p className={css.birdPDesc}>Прямо з кошика можна відкоригувати замовлення, додати або видалити примірники книг </p>
</div>
<img src={arrowBirdOpt} className={css.arrowBirdOptSt}/>

    </div>
    <div className={css.birdWrapSecond}>
    <img src={arrowBirdOpt} className={css.arrowBirdOptSt}/>
    <div className={css.birdWrap}>
<img src={optBirdFour}/>
<p className={css.birdPDesc}>Ваша гуртова знижка підтягнеться автоматично, треба лише увійти в свій акаунт</p>
</div>
<img src={arrowBirdOpt} className={css.arrowBirdOptSt}/>
<div className={css.birdWrap}>
<img src={optBirdFive}/>
<p className={css.birdPDesc}>Якщо у вас відсутній акаунт, але ви хочете долучитись до розповсюдження книг видавництва, зареєструєтесь як партнер у одній з запропонованих ролей і ви отримаєте персональну знижку</p>
</div>
<img src={arrowBirdOpt} className={css.arrowBirdOptSt}/>
<div className={css.birdWrap}>
<img src={optBirdSix}/>
<p className={css.birdPDesc}> Кожен рядок інтерактивний. Ви можете перейти з нього на сторінку книги та дізнатись про неї більше, подивитись відео чи опис книги</p>
</div>

    </div>

</div>
  {/* Верхній блок з пташками */}
    {/* Блок з текстом */}
    <div className={css.blockTextWrap}>
        <div className={css.blockTextWrapSmall}>
        <p className={css.pBlockTextWrap}>Ми продаємо книги, як місіонери. Тобто продаємо лише ті книги, що мають в собі меседж, і наше завдання донести цей меседж до людини. Якщо меседж її “торкне”, вона купить книгу та прийде знов у майбутньому. Наша мета — не продати книгу, а донести її головну ідею. Якщо ви розповсюджуєте наші книжки, ми радимо читати їх або (як мінімум) дивитись відео, в яких ми доносимо меседж кожного видання. В такому разі ви зможете донести цей меседж до покупців. Якщо продавець знає книгу та чим вона може прорости в дитині, це значно підвищує продажі. Це не теорія — це наш досвід, перевірений на практиці.</p>
   <h1 className={css.timeToChas}>Настав час майстрів!</h1>
   </div>
    </div>
    {/* Блок акційний */}
    <div className={css.salesBlockWrap}>
        <div className={css.blueBlockWrap}>
            <h3 className={css.saleForNewYear}>
            Акція до<br/> Нового року
            </h3>
            <div className={css.prdeProdPricingCart}>
        <div className={css.prdeProdPricingRotateCart}>
        
        <p className={css.salePriceCart}>+5</p>
        <p className={css.fullPriceCart}>безкоштовно*</p>
        </div>
       </div>
       <button className={css.buttonJoin}>Приєднатися</button>
       <img className={css.saleNewOneSt} src={saleNewOne}/>
       <img className={css.saleNewTwoSt} src={saleNewTwo}/>
       <img className={css.saleThreBlockSt} src={saleThreBlock}/>
       <p className={css.vidTwPcs}>*від 20 одиниць</p>
        </div>
        <div className={css.yelowBlockWrap}>
        <h3 className={css.saleForProduction}>
        Розпродаж у зв'язку зі<br/>зняттям з виробництва
            </h3>
            <div className={css.prdeProdPricingCartPr}>
        <div className={css.prdeProdPricingRotateCartPr}>
        
        <p className={css.salePriceCartPr}>-20%</p>
        <p className={css.fullPriceCartPr}>знижка</p>
       
        </div>
       </div>
       <button className={css.buttonJoinPr}>Детальніше</button>
        <p className={css.vidTwPcsPr}>до 29 вересня</p>
        <img className={css.prodNewOneSt} src={rotatePic}/>
       <img className={css.prodNewTwoSt} src={notRotatePic}/>
        </div>
    </div>
        {/* Блок акційний */}
            {/* Блок вже скоро */}
            <div className={css.blockSoonWrap}>
                <h5 className={css.soonH5}>Вже скоро</h5>
                <div className={css.blockSoonProd}>
                <div className={css.blockSoonFirst}>
                    <img src={soonPicProd} className={css.soonPicProdSt}/>
                    <div className={css.soonPicProdStDesc}>
                        <p className={css.soonAuthor}>Е.Портер</p>
                        <h1 className={css.soonAuthorName}>"Поліанна"</h1>
                        <div className={css.rombWrap}>
        <div className={css.rombWrapPod}>
        
        <p className={css.pricePodRomb}>230</p>
        <p className={css.pricePodRombText}>грн</p>
       
        </div>
       </div>
       <div className={css.counterWrap}>
        <div className={css.boxCount}>-</div>
        <p className={css.theCount}>
            0
        </p>
        <div className={css.boxCount}>+</div>
       </div>
                    </div>
                    </div>


<p className={css.childrenLike}>Дітям дуже цікаво дізнатись, хто такий Миколай і чому він дарує всім подарунки.ТУТ МАЄ БУТИ ОПИС КНИГИ “Поліанна”.</p>
               <div className={css.greyWrapP}>
                <p className={css.greyP}>Вік: 10+ років</p>
                <p className={css.greyP}>Жанр: короткі оповідання </p>
                <p className={css.greyP}>Призначення: святкова/створює традиції/створює образи/ для еволюції душі</p>
               </div>
               
                </div>
            </div>
             {/* Блок Радимо прочитати */}
             <div className={css.needReadWrap}>
                <h5 className={css.needReadH5}>Радимо прочитати</h5>
                <p className={css.needReadP}>“Час майстрів” перечитує багацько рукописів, є членом журі “Коронації слова” та «Корнійчуковської премії». Ми обираємо тексти, що читаються на одному подиху, написані добротною мовою, з урахування психологічних потреб дітей та головне відповідають нашій місії (інтерактив перекидає на сторінку опису місії компанії). З цих рукописів ми творимо книгу як витвір мистецтва. Нами вже зроблена велика робота й ми відповідаємо за якість рекомендованих нами книг.</p>
                <div className={css.needProductWrap}>
                    <ProductInOpt/>
                    <ProductInOpt/>
                    <ProductInOpt/>
                    <ProductInOpt/>
                    <ProductInOpt/>
                    <ProductInOpt/>
                </div>
             </div>
              {/* Блок найкраще дітям */}
              <div className={css.theBestForChildren}>
                <h5 className={css.theBestForChildrenH5}>
                Найкраще — дiтям
                </h5>
                <p className={css.theBestForChildrenP}>“Час майстрів” мандрує світом. Їздить найбільшими книжковими ярмарками, перемацує тисячі книг з різних куточків світу. Аналізує іноземні інтернет-магазини, рейтинги, читає описи на іноземних мовах, спілкується з місцевими жителями, читаємо рукописи і обираємо для наших дітей найкращі книги що видаються у всьому Світі.</p>
                <div className={css.needProductWrap}>
                    <ProductInOpt/>
                    <ProductInOpt/>
                    <ProductInOpt/>
                  
                </div>
                <div className={css.bestForChildrenWrapEnd}>
                    <h2 className={css.priceOptH2}>Всього: 8040 грн</h2>
                    <button className={css.buttonOrderOpt}>Замовити</button>
                </div>
              </div>
                {/* Блок різнокольорович */}
                <div className={css.colorBlockWrap}>
                    <div className={css.electro}>Елетронний документообіг</div>
                    <div className={css.catolog}>Скачати каталог</div>
                    <div className={css.delivery}>Безоплатна доставка при замовлені від 3000 грн</div>
                    <div className={css.discount}>40% знижки при щомісячному замовлені на умовах попередньої оплати</div>

                </div>
                 {/* Блок літ шоу */}
                 <LitShow/>
            <Footer/>
        </div>
    )




    }