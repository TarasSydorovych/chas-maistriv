import {HandySvg} from 'handy-svg';
import { useState, useEffect } from "react";
import IconSocial from './iconSocial';
import Number from './number';
import Search from './search';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import iconSrc from '../../../svg/phone.svg';
import checkTelegramSubscription from '../../../function/checkTelegramSubscription'
import {auth, db} from '../../../firebase'
import Sun from './sun';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
export default function HeaderApp({login, setLogin, setCart ,countProductForCart}) {
    const [user, setUser] = useState('');
    const [windowDimensions, setWindowDimensions] = useState(true)
const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
          
            // Користувач увійшов в систему
            setUser(currentUser);
            const fetchData = async () => {
              
              const userRef = doc(db, 'users', currentUser.uid);
              const userDoc = await getDoc(userRef);
          
              if (userDoc.exists()) {
                const userData = userDoc.data();
                checkTelegramSubscription(userData)
                // Виконати потрібні дії з userData
              }
            };
          
            fetchData();
       
          } else {
            // Користувач вийшов з системи
            
            setUser(null);
          }
        });
      
        return () => {
          // Відписка від слухача після розмонтовування компоненти
          unsubscribe();
        };
      }, []);

      useEffect(() => {
      
        function handleResize() {
         
          if(window.innerWidth < 1100){
      
          setWindowDimensions(false);
        }else{
          setWindowDimensions(true);
        }
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);


    return(
        <section id="sectionHeaderApp">
          {windowDimensions &&
          <div className="headerAppWrap">
          <div className="language">
              
              <div className="iconLanguage">
              <div className='blue'></div>
              <div className='yellow'></div>
              </div>
              <div className="textLanguage">
                  ua
              </div>
          </div>
          <IconSocial/>
      <Sun/>
      <Number/>
      <Search user={user} countProductForCart={countProductForCart} setLogin={setLogin} login={login} setCart={setCart}/>
      </div>
          }
          {!windowDimensions &&
          <>
            <Sun/>
            <div className="headerAppWrap">
            <div className="language">
              
              <div className="iconLanguage">
              <div className='blue'></div>
              <div className='yellow'></div>
              </div>
              <div className="textLanguage">
                  ua
              </div>
          </div>
          <a className='phoneHref' href="tel:+380672315737">
      <div className='numberWrap'>
         <HandySvg 
                    src={iconSrc}
                    width="18"
        height="16.37"
                    />
      </div>
      </a>
      <Search user={user} countProductForCart={countProductForCart} setLogin={setLogin} login={login} setCart={setCart}/>
            </div>
            </>
}

        </section>
    )
}