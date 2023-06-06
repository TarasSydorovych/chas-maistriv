import ViewProductCatalog from "../catalog/viewProductCatalog";
import YouLikeIt from "../catalog/youLikeIt";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import Description from "./description";
import Hero from "./hero";
import HeroPage from "./heroPage";
import css from './product.module.css'
import ProductPageTitle from "./productPageTitle";
import Respons from "./respons";
import ResponsTextArea from "./responsTextArea";
import VideoBlock from "./videoBlock";
import WhyNeedRead from "./whyNeedRead";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';



export default function Product({products, setAddressChanged, addressChanged, setLogin}) {
  const [reloadP, setReloadP] = useState(true);
  const [isOrdered, setIsOrdered] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
const [user, setUser] = useState('');
const [rerenderAfter, setRerenderAfter] = useState(false);
       const [oneProd, setOneProd] = useState();
       const [haveProd, setHaveProd] = useState(false);
       const [rewievList, setRewievList] = useState([]);


    let params = useParams();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          
          // Користувач увійшов в систему
          setUser(currentUser);
           console.log('currentUser',currentUser)
     
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
    let isMounted = true;
    for(let i = 0; i < products.length; i++){
        if(products[i].uid === params.id){
            setOneProd(products[i])
            
            setHaveProd(true)
            
        }
    }
    

    
}, [products, addressChanged])
useEffect(() => {
  if (addressChanged) {
    window.scrollTo(0, 0);
    setAddressChanged(false);
  }
}, [addressChanged]);
useEffect(() => {
 

    const fetchProducts = async () => {
      const productsRef = collection(db, 'reviews');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const arr = []
      for(let i = 0; i < productsList.length; i++){
        if(productsList[i].productId === oneProd?.uid){
          arr.push(productsList[i])
          console.log('aaaaaaaaaaaaaaaaaaa',arr);
        }
      }
      if(isMounted) {
        setRewievList(arr)
      }
    };

    let isMounted = true;
    if (haveProd && oneProd) {
      fetchProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [oneProd, haveProd, reloadP]);

// функціонал для корегування відгуків

useEffect(() => {
  // Перевіряємо, чи користувач замовив цей товар
  // const checkOrder = async () => {
  //   try {
  //     const ordersCol = collection(db, 'orders');
  //     //const q = query(ordersCol, where('user', '==', user.uid), where('choice', 'array-contains', { uid: oneProd.uid }));
  //     const q = query(ordersCol, where('user', '==', user.uid), where('choice', 'array-contains', oneProd.uid));
  //     const querySnapshot = await getDocs(q);
  //    console.log('querySnapshot', querySnapshot.empty)
  //     if (!querySnapshot.empty) {
  //       setIsOrdered(true);
  //     }
  //   } catch (error) {
  //     console.error('Error checking order:', error);
  //   }
  // };
  const checkOrder = async () => {
    try {
      const ordersCol = collection(db, 'orders');
      const q = query(ordersCol, where('user', '==', user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const order = { id: doc.id, ...doc.data() };
        const choice = JSON.parse(order.choice);

        const foundProduct = choice.find((tovar) => tovar.uid === oneProd.uid);
        if (foundProduct) {
          setIsOrdered(true);
        }
      });
    } catch (error) {
      console.error('Error checking order:', error);
    }
  };
  // Перевіряємо, чи користувач вже робив відгук для цього товару
  const checkReview = async () => {
    try {
      const reviewsCol = collection(db, 'reviews');
      const q = query(reviewsCol, where('productId', '==', oneProd.uid), where('userUid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setHasReviewed(true);
      }
    } catch (error) {
      console.error('Error checking review:', error);
    }
  };

  checkOrder();
  checkReview();
}, [oneProd, user, rerenderAfter]);

const enterUser = () => {
  setLogin(true)
}




    return(
        
        <>
       {haveProd &&
       <>
      
<ProductPageTitle oneProd={oneProd}/>
<Description oneProd={oneProd}/>
<WhyNeedRead/>
<VideoBlock/>

<Hero/>
<HeroPage/>
{rewievList.length > 0 && 
<>
<Respons rewievList={rewievList} reloadP={reloadP}/>

</>
}
{user && 
<>
{isOrdered && !hasReviewed ? (
<ResponsTextArea rerenderAfter={rerenderAfter} setRerenderAfter={setRerenderAfter} user={user} oneProd={oneProd} reloadP={reloadP} setReloadP={setReloadP}/>
 ) : (
  <p className={css.canNotAddDesc}>Ви не можете додати відгук до цього товару, оскільки ви вже додали відгук до нього або ще не придбали товар.</p>
  )}
  </>
}
{!user &&
<div className={css.buttonReg}>Для того щоб додати відгук <span className={css.buttonRegSpan} onClick={enterUser}>Зареєструйтесь</span>  </div>
}


<ViewProductCatalog products={products} setAddressChanged={setAddressChanged}/>
        <Footer/>
        </>
    }
        </>
    
    )
}