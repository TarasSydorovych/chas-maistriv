import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from './userCabinet.module.css'
import { collection, query, where, getDocs } from 'firebase/firestore';
import authPic from '../../img/userPic.png'
import iconProp from '../../img/iconProp.png'
import Group16 from '../../img/Group16.png'
import facForUs from '../../img/facForUs.png'
import mailForSoc from '../../img/mailForSoc.png'
import tgUser from '../../img/tgUser.png'
import whatUser from '../../img/whatUser.png'
import { useState, useEffect } from "react";
import WaitProd from "./waitProd";
import discIcon from '../../img/discIcon.png'
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from '../../firebase'
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import elefant from '../../img/elefant.png'
import ViewProductCatalog from "../catalog/viewProductCatalog";
export default function UserCabinet({products, setAddressChanged, addressChanged}) {

    const navigate = useNavigate();
    const [selectedText, setSelectedText] = useState(1);
    const [user, setUser] = useState('');
    const [orders, setOrders] = useState([]);
    const [parsedChoices, setParsedChoices] = useState([]);
  
    const [waitProdComponents, setWaitProdComponents] = useState([]);
    // const parseChoices = () => {
    //     const parsedData = orders.map((order) => {
    //       const choice = JSON.parse(order.choice);
    //       return { ...order, choice };
    //     });
    //     setParsedChoices(parsedData);
    //     console.log(
    //         'розпарсені товари',parsedData
    //     )
    //   };
  
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
           console.log('Curent user',currentUser)
            // Користувач увійшов в систему
            setUser(currentUser);
          } else {
            // Користувач вийшов з системи
        
            navigate('/')
            setUser(null);
          }
        });
     
    
        return () => {
          // Відписка від слухача після розмонтовування компоненти
          unsubscribe();
        };
      },[])
    const handleBlockClick = (text) => {
       setSelectedText(text);
    };
    // useEffect(() => {
    //     const fetchOrdersByUser = async () => {
    //       try {
    //         const ordersRef = collection(db, 'orders');
    //         const q = query(ordersRef, where('user', '==', user.uid));
    //         const querySnapshot = await getDocs(q);
    
    //         const ordersData = [];
    //         querySnapshot.forEach((doc) => {
    //           ordersData.push({ id: doc.id, ...doc.data() });
    //         });
    
    //         // Встановлюємо отримані замовлення у стан компонента
    //         console.log('всі товари користувача', ordersData);
    //         setOrders(ordersData);
    //         parseChoices();
    //       } catch (error) {
    //         console.error('Помилка при отриманні замовлень:', error);
    //       }
    //     };
    
    //     // Викликаємо функцію для отримання замовлень користувача
    //     fetchOrdersByUser();
    //   }, [user]);
    // useEffect(() => {
    //     const fetchOrdersByUser = async () => {
    //       try {
    //         const ordersRef = collection(db, 'orders');
    //         const q = query(ordersRef, where('user', '==', user.uid));
    //         const querySnapshot = await getDocs(q);
    
    //         const parsedData = [];
    //         querySnapshot.forEach((doc) => {
    //           const order = { id: doc.id, ...doc.data() };
    //           const choice = JSON.parse(order.choice);
    //           choice.forEach((tovar) => {
    //             parsedData.push({ order, tovar });
    //           });
    //         });
    
    //         setOrders(parsedData);
    
    //             const waitProdComponents = parsedData.map(({ order, tovar }, index) => (
    //             <WaitProd key={index} el={order} tovar={tovar} />
    //             ));
    
    //         setWaitProdComponents(waitProdComponents);
    //         console.log('waitProdComponents', parsedData)
    //       } catch (error) {
    //         console.error('Помилка при отриманні замовлень:', error);
    //       }
    //     };
    
    //     fetchOrdersByUser();
    //   }, [user]);
  
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
     
            if (selectedText === 2) {
                console.log('selectedText', selectedText)
              filteredData = parsedData.filter(({ order }) => order.status === 'Очікує підтвердження');
            }else{
                filteredData = parsedData.filter(({ order }) => order.status !== 'Очікує підтвердження');
            }       
      
            setOrders(filteredData);
      
            const waitProdComponents = filteredData.map(({ order, tovar }, index) => (
              <WaitProd key={index} el={order} tovar={tovar} />
            ));
      
            setWaitProdComponents(waitProdComponents);
            console.log('waitProdComponents', waitProdComponents);
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
   

    return(
        <div>
            <Header/>
<div className={css.bleuLabel}>
<div className={css.blueLabelWnutr}>
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

<img src={Group16} className={css.iconPicBird}/>

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
      <p>Немає очікуваних замовлень</p>
    )}
</div>



</div>


<div className={css.yourDiscountWrap}>
    <div className={css.yourDiscountWrapSmall}>
        <div className={css.dicsTextWr}>
            <p className={css.yourDicrFive}>Ваша знижка*<br/><span className={css.yourDicrFiveSpan}>5%</span></p>
            <p className={css.yourDicrFiveSmall}>До знижки не додаються акції, розпродаж, предпродаж </p>
        </div>
        <img src={discIcon} className={css.discIconIc}/>
        <div className={css.buttonConfFRW}>
            <p className={css.confirmP}>Запросити друга</p>
            <div className={css.likeButton}>Запросити</div>
        </div>
    </div>

</div>


<div className={css.elefantWrap}>
    <div className={css.elefantWrapSmall}>
        <div className={css.elef}>
<img src={elefant} className={css.elefant}/>
<p className={css.howMathElefant}>Ваші слони (бонуси) <br/><span className={css.howMathElefantSpan}>135</span></p>
        </div>
        <p className={css.elefantDescription}>Ви можете <br/> сплачувати слонами<br/> за наші книги<br/> курс <span className={css.elefantDescriptionSpan}>1 Слон = 1 Грн</span></p>
    </div>
</div>
<ViewProductCatalog products={products} setAddressChanged={setAddressChanged}/>


<Footer/>
        </div>
    )
}