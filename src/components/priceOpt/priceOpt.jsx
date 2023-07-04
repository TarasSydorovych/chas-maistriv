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
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import {auth, db} from '../../firebase'
import { useEffect, useState} from 'react'
import saleThreBlock from '../../img/saleThreBlock.png'
import rotatePic from '../../img/rotatePic.png'
import notRotatePic from '../../img/notRotatePic.png'
import soonPicProd from '../../img/soonPicProd.png'
import ProductInOpt from './productInOpt'
import LitShow from '../standartComponent/litShow/litShow'
export default function PriceOpt({windowDimensions}) {
    const [productsData, setProductsData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

const obj = [
    {
     name: 'Я граюся, я вчуся',
     desc: 'Гра — найлегший, найприродніший та найприємніший спосіб пізнання світу. Навчаючись через гру, діти почуваються комфортно, впевнено, творчо мислять, не бояться помилитися. Книжки цієї серії покликані надати дітям можливість розвиватися через гру. Із ними можна приємно провести час, водночас отримуючи нові знання та навички.',
     arr: [],
    },
    {
        name: 'Вімельбух',
        desc: 'Вімельбухи («мерехтливі книжки») знайомлять малюків зі світом навколо, розвивають уяву та мовлення. Кожен розгорт містить велику ілюстрацію із безліччю деталей і дозволяє дитині вигадати та розповісти власні історії про все, що відбувається на малюнку.',
        arr: [],
    },
       {
        name: 'Відкривай',
        desc: 'Пізнавальні книжки, які допомагають дитині зробити маленькі відкриття про великий світ, у якому вона живе',
        arr: [],
    },
       {
        name: 'Найкраще — дітям',
        desc: '«Найкраще — дітям» — це купецький проект. Ми подорожуємо усім світом у пошуках найкращих дитячих книг. Обираємо правильні тексти і вишукані ілюстрації. А потім купуємо права на ці книги, щоб надрукувати їх для наших діток.',
        arr: [],
    },
       {
        name: 'Казкова допомога',
        desc: 'Книжки, які допомагають розшифрувати зміст казок, що з доісторичних часів зберігають важливі для набуття щастя послання. Спробуйте разом із нами розгадати таємниці казок, усвідомити істини наших прабатьків — і ви здобудете казкову допомогу Роду.',
        arr: [],
    },
       {
        name: 'Книжка іграшка',
        desc: 'Книжки цієї серії покликані сприяти розвитку дитини найприроднішим шляхом — через гру.',
        arr: [],
    },
       {
        name: 'Малювальна історія',
        desc: 'Видання цієї серії дозволяють читачу стати співавтором: вони містять не лише цікаві історії, а й незавершені ілюстрації, які кожна дитина може домалювати і розфарбувати по-своєму, отримавши в результаті унікальну книжку-картинку.',
        arr: [],
    },
       {
        name: 'Рекомендуємо прочитати',
        desc: 'Книжки, які редколегія видавництва — літературознавці, психологи, критики, батьки, діти — обрала для видання з-поміж величезної кількості творів. Довіртеся у виборі книжки для читання експертам та лідерам думок!',
        arr: [],
    },
       {
        name: 'Книга нового року',
        desc: 'Захопливі новорічні історії та яскраві ілюстрації роблять книжки цієї серії найкращим подарунком до зимових свят.',
        arr: [],
    },
       {
        name: 'Батькам',
        desc: 'Видання, призначені для прогресивних і турботливих батьків, що прагнуть до всебічного розвитку дітей та гармонійного родинного життя.',
        arr: [],
    },
       {
        name: 'Дитячий путівник',
        desc: 'Яскраво ілюстровані пізнавальні видання, які зацікавлюють дітей світом навколо них.',
        arr: [],
    },
       {
        name: '2000 вправ та завдань',
        desc: 'До серії входять робочі зошити для учнів початкових класів, які допомагають опанувати знання з математики, української, англійської та російської мови.',
        arr: [],
    },
       {
        name: 'Цікаво',
        desc: 'До серії входять посібники для учнів початкових класів, що поєднують прості цікаві завдання, які поступово пояснюють логіку обчислення, з великою кількістю типових вправ, виконання яких допомагає набути навичок миттєвого обчислення',
       arr: [],
    },
      
]

useEffect(() => {
    const fetchData = async () => {
  
      const collectionRef = collection(db, 'product');
      const querySnapshot = await getDocs(collectionRef);
      const products = querySnapshot.docs.map((doc) => doc.data());

      const updatedProductsData = obj.reduce((acc, item) => {
        const matchingProducts = products.filter((product) => product.seria === item.name);
        if (matchingProducts.length > 0) {
          acc.push({
            name: item.name,
            desc: item.desc,
            products: matchingProducts,
          });
        }
        return acc;
      }, []);

      setProductsData(updatedProductsData);
    };

    fetchData();
  }, []);
  const [products, setProducts] = useState([]);
    const [haveProduct, setHaveProduct] = useState(false);
    const [cartProducts, setCartProducts] = useState();
   
    const [finishPrice, setFinishPrice] = useState(0);
    

  


  const [totalSum, setTotalSum] = useState(0);
 

  useEffect(() => {
    const calculateTotalSum = () => {
      let totalSum = 0;
  
      // Отримуємо корзину з localStorage
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
  
        // Отримуємо товари з бази даних
        const productUids = cartItems.map((item) => item.uid);
  
        // Рахуємо загальну суму на основі кількості та ціни товарів з бази даних
        productsData.forEach((category) => {
          category.products.forEach((product) => {
            if (productUids.includes(product.uid)) {
              const quantity = cartItems.find((item) => item.uid === product.uid).quantity;
              totalSum += product.price * quantity;
            }
          });
        });
      }
  
      // Оновлюємо загальну суму
      setTotalSum(totalSum);
    };
  
    calculateTotalSum();
  }, [haveProduct]);
  

 


    return(
        <div>
           
            {/* Верхній блок з пташками */}
<div className={css.titleWrap}>
    <h3 className={css.h3Title}>На цій сторінці зручно робити гуртові замовлення</h3>
    {windowDimensions &&
    <>
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
    </>
    }
      {!windowDimensions &&
      <>
        <div className={css.birdWrap}>
<img src={optBirdFirst}/>
<p className={css.birdPDesc}>В графі “замовлення” проставте кількість </p>
</div>
      </>}

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
            {/* Блок вже скоро 
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
            */}
             {/* Блок Радимо прочитати
             <div className={css.needReadWrap}>
                <h5 className={css.needReadH5}>Радимо прочитати</h5>
                <p className={css.needReadP}>“Час майстрів” перечитує багацько рукописів, є членом журі “Коронації слова” та «Корнійчуковської премії». Ми обираємо тексти, що читаються на одному подиху, написані добротною мовою, з урахування психологічних потреб дітей та головне відповідають нашій місії (інтерактив перекидає на сторінку опису місії компанії). З цих рукописів ми творимо книгу як витвір мистецтва. Нами вже зроблена велика робота й ми відповідаємо за якість рекомендованих нами книг.</p>
                <div className={css.needProductWrap}>
                   
                </div>
             </div>
             */}
              {/* Блок найкраще дітям */}
              {productsData.map((item, index) => {
               
   return <div key={index} className={css.theBestForChildren}>
    <h5 className={css.theBestForChildrenH5}>
    {item.name}
    </h5>
    <p className={css.theBestForChildrenP}>{item.desc}</p>
    <div className={css.needProductWrap}>
        {item.products.map((el, ind) => {
            
            return   <ProductInOpt setHaveProduct={setHaveProduct} haveProduct={haveProduct} setTotalPrice={setTotalPrice} key={ind} el={el}/>
       
        })}
      
        
      
    </div>
  {index === (productsData.length - 1) &&
    <div className={css.bestForChildrenWrapEnd}>
        <h2 className={css.priceOptH2}>Всього: {totalSum} грн</h2>
        <button className={css.buttonOrderOpt}>Замовити</button>
    </div>
    }
  </div>
              })};
          
                {/* Блок різнокольорович */}
                <div className={css.colorBlockWrap}>
                    <div className={css.electro}>Елетронний документообіг</div>
                    <div className={css.catolog}>Скачати каталог</div>
                    <div className={css.delivery}>Безоплатна доставка при замовлені від 3000 грн</div>
                    <div className={css.discount}>40% знижки при щомісячному замовлені на умовах попередньої оплати</div>

                </div>
                 {/* Блок літ шоу */}
                 <LitShow/>
         
        </div>
    )




    }