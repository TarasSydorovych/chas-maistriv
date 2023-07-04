import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from './userCabinet.module.css'
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import authPic from '../../img/userPic.png'
import iconProp from '../../img/iconProp.png'
import Group16 from '../../img/Group16.png'
import Group17 from '../../img/smallGroup.png'
import TelegramLoginButton from 'react-telegram-login';
import facForUs from '../../img/facForUs.png'
import mailForSoc from '../../img/mailForSoc.png'
import tgUser from '../../img/tgUser.png'
import { onSnapshot} from 'firebase/firestore';

import whatUser from '../../img/whatUser.png'
import { useState, useEffect } from "react";
import WaitProd from "./waitProd";
import discIcon from '../../img/discIcon.png'
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from '../../firebase'
import axios from 'axios';
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import elefant from '../../img/elefant.png'
import ViewProductCatalog from "../catalog/viewProductCatalog";
import WaitProdLike from "./waitProdLike";

export default function UserCabinet({products, setAddressChanged, addressChanged, windowDimensions}) {

    const navigate = useNavigate();
    const [selectedText, setSelectedText] = useState(1);
    const [user, setUser] = useState('');
    const [userBd, setUserBd] = useState('');
    const [orders, setOrders] = useState([]);
    const [parsedChoices, setParsedChoices] = useState([]);
    const [needRe, setNeedRe] = useState(false);
    const apiKey = 'f579aac88b980dff3f819958ce1cbca6';
    const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
    const [telegramUserId, setTelegramUserId] = useState('');
    const [waitProdComponents, setWaitProdComponents] = useState([]);

   
    async function checkTelegramSubscription(user) {
      const botToken = '6266005117:AAHxzv2HFvvbNQ1CkPCumJg7tvPGDdNPusY';
      const channelId = '-1001865626987';
      
      try {
        // Виклик Telegram Bot API для отримання інформації про підписку користувача
        const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChatMember`, {
          params: {
            chat_id: channelId,
            user_id: '1476312771',
          },
        });
      
        if (response.data.ok && response.data.result && response.data.result.status === 'member') {
          console.log('true Chanel')
          return true; // Користувач підписаний на канал
        } else {
          console.log('false Chanel')
          return false; // Користувач не підписаний на канал
        }
      } catch (error) {
        console.error('Помилка при виклику Telegram Bot API:', error);
        return false; // Помилка при виклику Telegram Bot API
      }
    }
    

    async function getTelegramUserId() {
      try {
        const botToken = '6266005117:AAHxzv2HFvvbNQ1CkPCumJg7tvPGDdNPusY';
        const response = await axios.get(`https://api.telegram.org/bot${botToken}/getMe`);
        const telegramUserId = response.data.result;
        return telegramUserId;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
   

    const handleTelegramResponse = (response) => {
      // Обробка отриманих даних від Telegram
      console.log('Telegram response:', response);
      // Виконайте необхідні дії з отриманими даними, наприклад, реєстрація користувача
    };

    // Функція, що викликається при кліку на кнопку підписки
    async function handleSubscribeClick() {
      try {
        const telegramUserId = await getTelegramUserId();
        console.log('Telegram User ID:', telegramUserId);
    
        // Виконайте інші дії після отримання Telegram ID, наприклад, збереження у базі даних або відправка на сервер.
      } catch (error) {
        console.error('Error:', error);
      }
    }
    const handleLogout = () => {

      
        signOut(auth)
          .then(() => {
            
            navigate('/')
            // Додайте необхідну логіку після виходу користувача
          })
          .catch((error) => {
            console.log('Помилка під час виходу з системи:', error);
          });
      };
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            
            // Користувач увійшов в систему
            setUser(currentUser);
      
       
          } else {
            // Користувач вийшов з системи
            navigate('/');
            setUser(null);
          }
        });
      
        return () => {
          // Відписка від слухача після розмонтовування компоненти
          unsubscribe();
        };
      }, []);
      useEffect(() => {
        if(user){
        const usersRef = collection(db, 'users');
        const userQuery = query(usersRef, where('uid', '==', user.uid));
        const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
          snapshot.forEach((doc) => {
            const userData = doc.data();
            
            setUserBd(userData);
          });
        });
      
        return () => {
          // Відписка від слухача користувача після розмонтовування компоненти
          unsubscribeUser();
        };
      }
      }, [user, needRe])
      const handleClick = async () => {
        try {
          // Отримання документу користувача з колекції "users" за його uid
          const userDocRef = doc(collection(db, 'users'), userBd.uid);
          const userDocSnap = await getDoc(userDocRef);
    
          if (userDocSnap.exists()) {
            // Оновлення значення поля "discount" на 10
            const updatedDiscount = 5;
    
            // Оновлення значення поля "signed" на true
            const updatedSigned = 'true';
    
            // Оновлення документу користувача
            await updateDoc(userDocRef, {
              discount: updatedDiscount,
              signed: updatedSigned,
            });
            setNeedRe(!needRe);
            // Оновлення стану з новими даними користувача
          } else {
            console.log('Користувача з таким uid не знайдено');
          }
        } catch (error) {
          console.error('Помилка при оновленні даних користувача:', error);
        }
      }
    const handleBlockClick = (text) => {
       setSelectedText(text);
    };
    
      //Це робочий ефектіііііііііііііііііііііііііііііііііііііііііііііііііііііііі
      useEffect(() => {
        const fetchOrdersByUser = async () => {
          try {
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('user', '==', user.uid));
            const querySnapshot = await getDocs(q);
      
            const parsedData = [];
            querySnapshot.forEach((doc) => {
              const order = { id: doc.id, ...doc.data() };
              const choice = JSON.parse(order.choice);
              choice.forEach((tovar) => {
                parsedData.push({ order, tovar });
              });
            });
      
            let filteredData;
       console.log('selectedText', selectedText)
            if (selectedText === 2) {
              filteredData = parsedData.filter(({ order }) => order.status === 'Очікує підтвердження');
            } else if(selectedText === 3){
               filteredData = JSON.parse(localStorage.getItem('likedProducts')) || [];

            }else {
              filteredData = parsedData.filter(({ order }) => order.status !== 'Очікує підтвердження');
            }
      
            setOrders(filteredData);
      
          
            if(selectedText !== 3){
              const ttnNumbers = filteredData.map(({ order }) => order.status);
      
              const response = await axios.post(apiUrl, {
                apiKey: apiKey,
                modelName: 'TrackingDocument',
                calledMethod: 'getStatusDocuments',
                methodProperties: {
                  Documents: ttnNumbers.map((status) => ({ DocumentNumber: status })),
                },
              });
        
              const statuses = response.data.data;
            const waitProdComponents = filteredData.map(({ order, tovar }, index) => {
              const status = statuses.find((s) => s.Number === order.status)?.Status || 'Очікує підтвердження';
      
              return (
                <WaitProd key={index} el={order} tovar={tovar} status={status} />
              );
            });
      
            setWaitProdComponents(waitProdComponents);
          }else if(selectedText === 3){
            const waitProdComponents = filteredData.map((tovar, index) => {
              return (
                <WaitProdLike key={index} tovar={tovar}  />
              );
            });
      
            setWaitProdComponents(waitProdComponents);
          }
          } catch (error) {
            console.error('Помилка при отриманні замовлень:', error);
          }
        };
      
        fetchOrdersByUser();
      }, [user, selectedText]);
    const blocks = [
      { id: 1, text: 'Очікувані замовлення' },
      { id: 2, text: 'Чекають опрацювання' },
      { id: 3, text: 'Бажане' },
    ];
   const onClickToElefant = () => {
    alert("Слон дорівнює 1 грн. Слони нараховуються за ваші відгуки про наші книги. Ваші відгуки важливі, бо вони допомагають в просуванні книги в яку віримо ми і ви. Кількість слонів яка вам нараховується залежить від ціни і об'єму книги. Щоб отримати слони ви маєте розмістити відгук під книжкою яку ви раніше придбали. Слони не нараховуються автоматично за відгук, якщо ви не купували книгу на яку написали відгук на нашому сайті. Але вам можуть нарахуватись слони вручному режимі, якщо такий відгук підтвердить адміністратор сайта. Для цього ви повинні відправити лист адміністратору з посиланням на відгук.")
   }

    return(
        <div>
            
<div className={css.bleuLabel}>
<div className={css.blueLabelWnutr}>

<TelegramLoginButton dataOnauth={handleTelegramResponse} botName="chasTest_bot" />
<button onClick={checkTelegramSubscription}>telegram</button>
<button onClick={handleSubscribeClick}>Користува</button>
    <button onClick={handleLogout}>вийти</button>
<p className={css.firstTextInBlock}>Наша місія — допомогти батькам ростити дітей людьми, які вміють бути щасливими</p>
<p className={css.firstTextInBlock}>Наша мета — створювати якісні дитячі книги, від яких важко відірватися, та які збагачують.</p>
</div>

</div>


<div className={css.userInformationWrap}>
    <div className={css.userInformationWrapSmall}>
        <div className={css.yourInformation}>
<div className={css.userData}>
<div className={css.imgAutorWrapSmall}>
           
           <img src={authPic} className={css.imgAutorSmall}/>
           </div>
           <div className={css.nameAndPropWr}>
            <h4 className={css.userNameHello}>{user.displayName}, вітаємо!</h4>
            <div className={css.propWrap}>
                <img src={iconProp}/>
                <p className={css.propP}>Налаштування</p>
            </div>
           </div>
</div>
{windowDimensions &&
<img src={Group16} className={css.iconPicBird}/>
}
{!windowDimensions &&
<img src={Group17} className={css.iconPicBird}/>
}

        </div>
        <div className={css.ourInformation}>
<h4 className={css.yourRegistration}>Ви зареєстровані як член клуба “Час майстрів”</h4>
<p className={css.yourDescription}>Це дає вам знижки та доступ до коментів, а також ви потрапляєте під роздачу слонів (бонусів), можете брати участь в опікунських радах і тестуванні книг, впливати на вибір обкладинок, назв текстів та обговорювати злободенні питання. Якщо ви довіряєте нам як спеціалістам у виборі та створенні дитячої книги, запрошуємо вас встановити з нами прямий контакт через імейл, вайбер, телеграм, або вотсап. Приєднуйтесь до спільноти поціновувачів книжок, підписавшись на наші соцмережі. Настав Час майстрів.</p>
<div className={css.socialWrap}>
<a href='https://www.facebook.com/chasmaistriv' target="_blanck">
    <div className={css.standartsocial}>
    <img src={facForUs} />
    </div>
    </a>
    <a href="mailto:sales@chasmaistriv.com.ua" target="_blanck">
    <div className={css.standartsocial}>
    <img src={mailForSoc} />
    </div>
    </a>
    <a href='https://t.me/chasmaistriv_bot' target="_blanck">
    <div className={css.standartsocial}>
    <img src={tgUser} />
    </div>
    </a>
    <a href="https://wa.me/+380672315737" target="_blanck">
    <div className={css.standartsocial}>
    <img src={whatUser} />
    </div>
    </a>
</div>
        </div>
    </div>
</div>


<div className={css.orderingProductWrap}>
<div className={css.orderingProductWrapSmall}>
    <div className={css.wrapLab}>
    {blocks.map((block) => (
        <div
          key={block.id}
          className={`${css.block} ${block.id === selectedText ? css.selected : ''}`}
          onClick={() => handleBlockClick(block.id)}
        >
          {block.text}
        </div>
      ))}
</div>

{waitProdComponents.length > 0 ? (
      <div className={css.waitOrderInPostWrap}>{waitProdComponents}</div>
    ) : (
      <p></p>
    )}
</div>



</div>

{userBd.signed === 'false' &&
<div className={css.yourDiscountWrap}>
    <div className={css.yourDiscountWrapSmall}>
        <div className={css.dicsTextWr}>
            <p className={css.yourDicrFive}>Ваша знижка*<br/><span className={css.yourDicrFiveSpan}>{userBd.discount}%</span></p>
            <p className={css.yourDicrFiveSmall}>Для отримання знижки 5% підпишіться на email розсилку</p>
        </div>
        <img src={discIcon} className={css.discIconIc}/>
        <div className={css.buttonConfFRW}>
            <p className={css.confirmP}>Підпишіться</p>
            <div className={css.likeButton} onClick={handleClick}>Підписатись</div>
        </div>
    </div>

</div>
}
{userBd.signed === 'true' &&
<div className={css.yourDiscountWrap}>
    <div className={css.yourDiscountWrapSmall}>
        <div className={css.dicsTextWr}>
            <p className={css.yourDicrFive}>Ваша знижка*<br/><span className={css.yourDicrFiveSpan}>{userBd.discount}%</span></p>
            <p className={css.yourDicrFiveSmall}>До знижки не додаються акції, розпродаж, предпродаж </p>
        </div>
        <img src={discIcon} className={css.discIconIc}/>
        <div className={css.buttonConfFRW}>
            <p className={css.confirmP}>Запросити друга</p>
            <div className={css.likeButton}>Запросити</div>
        </div>
    </div>

</div>
}


<div className={css.elefantWrap} onClick={onClickToElefant}>
    <div className={css.elefantWrapSmall}>
        <div className={css.elef}>
<img src={elefant} className={css.elefant}/>
<p className={css.howMathElefant}>Ваші слони (бонуси) <br/><span className={css.howMathElefantSpan}>{userBd.elefant}</span></p>
        </div>
        <p className={css.elefantDescription}>Ви можете <br/> сплачувати слонами<br/> за наші книги<br/> курс <span className={css.elefantDescriptionSpan}>1 Слон = 1 Грн</span></p>
    </div>
</div>
<ViewProductCatalog products={products} setAddressChanged={setAddressChanged}/>


        </div>
    )
}