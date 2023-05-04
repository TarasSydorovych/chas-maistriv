import ViewProductCatalog from "../catalog/viewProductCatalog";
import YouLikeIt from "../catalog/youLikeIt";
import Footer from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import Description from "./description";
import Hero from "./hero";
import HeroPage from "./heroPage";
import ProductPageTitle from "./productPageTitle";
import Respons from "./respons";
import ResponsTextArea from "./responsTextArea";
import VideoBlock from "./videoBlock";
import WhyNeedRead from "./whyNeedRead";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';



export default function Product({products}) {
  const [reloadP, setReloadP] = useState(true);
  const [addressChanged, setAddressChanged] = useState(false);


       const [oneProd, setOneProd] = useState();
       const [haveProd, setHaveProd] = useState(false);
       const [rewievList, setRewievList] = useState([]);


    let params = useParams();

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

    return(
        
        <>
       {haveProd &&
       <>
        <Header/>
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
<ResponsTextArea oneProd={oneProd} reloadP={reloadP} setReloadP={setReloadP}/>
<ViewProductCatalog products={products} setAddressChanged={setAddressChanged}/>
        <Footer/>
        </>
    }
        </>
    
    )
}