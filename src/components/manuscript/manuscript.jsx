import ViewProductCatalog from "../catalog/viewProductCatalog";
import YouLikeIt from "../catalog/youLikeIt";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import Description from "./description";
import Hero from "./hero";
import HeroPage from "./heroPage";
import css from './product.module.css'
import autorPic from '../../img/sasasas.png'
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
import PdfReader from "./pdfReader";



export default function Manuscript({products, setAddressChanged, addressChanged, setLogin}) {
  const [reloadP, setReloadP] = useState(true);
  const [isOrdered, setIsOrdered] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
const [user, setUser] = useState('');
const [rerenderAfter, setRerenderAfter] = useState(false);
       const [oneProd, setOneProd] = useState();
       const [haveProd, setHaveProd] = useState(false);
       const [rewievList, setRewievList] = useState([]);
       const [isTimerFinished, setIsTimerFinished] = useState(false);
       const [isTimerRunning, setIsTimerRunning] = useState(false);
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
useEffect(() => {
  let timer;

  if (isTimerRunning) {
    console.log('Timer start')
    timer = setTimeout(() => {
      setIsTimerFinished(true);
    }, 5000); // Час таймера - 5000 мс (5 секунд)

    return () => {
      clearTimeout(timer);
    };
  }
}, [isTimerRunning, setIsTimerFinished]);



    return(
        
        <>
       {haveProd &&
       <>
      
<ProductPageTitle oneProd={oneProd}/>
<div className={css.inHvastWrap}>
  <div className={css.someWrapI}>
<div className={css.autorPic}>
<div className={css.autorPicRotate}>
<img src={autorPic} />

</div>
</div>
<div className={css.descWrapAutor}>
  <h4 className={css.manuscripnAuthRes}>Відгук експерта</h4>
<div className={css.yellowFitchWrap}>
    <p className={css.yellowFitchWrapP}>dsddddddddddddddddddd</p>
<div className={css.hvist}></div>
</div>
</div>
</div>
</div>
<div className={css.inHvastWrap}>
  <div className={css.someWrapI}>
<div className={css.autorPic}>
<div className={css.autorPicRotate}>
<img src={autorPic} />

</div>
</div>
<div className={css.descWrapAutor}>
  <h4 className={css.manuscripnAuthRes}>Відгук читача</h4>
<div className={css.yellowFitchWrap}>
    <p className={css.yellowFitchWrapP}>dsddddddddddddddddddd</p>
<div className={css.hvist}></div>
</div>
</div>
</div>
</div>
<PdfReader pdfUrl={oneProd.shortPdf} setIsTimerRunning={setIsTimerRunning}/>
{isTimerFinished && 
<div className={css.manuscriptPdfBigButWr}>
<a href={oneProd.longPdf} target="_blanck">
<button className={css.manuscriptPdfBigBut}>Переглянути весь літопис</button>
</a>
</div>
}
        <Footer/>
        </>
    }
        </>
    
    )
}