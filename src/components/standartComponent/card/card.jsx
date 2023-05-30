
import css from './card.module.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../../svg/xCardIcon.svg';
import ProdInCard from './prodInCard';
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from '../../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 

export default function Card({setCart, setCountProductForCart}) {
    const [products, setProducts] = useState([]);
    const [haveProduct, setHaveProduct] = useState(false);
    const [cartProducts, setCartProducts] = useState();
    const navigate = useNavigate();
    const [finishPrice, setFinishPrice] = useState(0);
    
    useEffect(() => {
        const fetchProducts = async () => {
          const productsRef = collection(db, 'product');
          const productsSnapshot = await getDocs(productsRef);
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setHaveProduct(true);
          setProducts(productsList);
          console.log('Список продуктів', productsList);

          const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
          const productsWithQuantities = cartProducts.map(product => {
            const foundProduct = productsList.find(p => p.id === product.uid);
            return {
              ...foundProduct,
              quantity: product.quantity
            }
          });
          setCartProducts(productsWithQuantities);
          console.log('Товари в корзині', productsWithQuantities);
        };
      
        fetchProducts();
      }, []);
    const cartClose= () => {
        setCart(false)
    }


  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (uid, quantity) => {
    const updatedCartProducts = cartProducts.map(product => {
      if (product.uid === uid) {
        return {
          ...product,
          quantity
        }
      } else {
        return product;
      }
    });
    const productToUpdate = updatedCartProducts.find(product => product.uid === uid);
    const totalPrice = updatedCartProducts.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
    setFinishPrice(totalPrice);
    setCartProducts(updatedCartProducts);
  
    // Update the quantity of the product with the corresponding uid in the localStorage
    if (productToUpdate) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const updatedCart = cart.map(product => {
        if (product.uid === uid) {
          return {
            ...product,
            quantity
          }
        } else {
          return product;
        }
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  
    // Update the total quantity of products in the cart
    const totalQuantity = updatedCartProducts.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
  };

const goToOrder = () => {
  navigate('/order')
}

  

  const removeProduct = (uid) => {
    const updatedCart = cartProducts.filter(product => product.uid !== uid);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  
    // Update the total quantity of products in the cart
    const totalQuantity = updatedCart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
  
    // Update the total price of products in the cart
    const totalPrice = updatedCart.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
    setFinishPrice(totalPrice || 0); // if updatedCart is empty, set totalPrice to 0
  };
  useEffect(() => {
    if (cartProducts && cartProducts.length) {
      const totalPrice = cartProducts.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
      }, 0);
      setFinishPrice(totalPrice);
  
      // Update the total quantity of products in the cart
      const totalQuantity = cartProducts.reduce((acc, product) => {
        return acc + product.quantity;
        }, 0);
        setCountProductForCart(totalQuantity);
        }
        }, [cartProducts]);

    return(
        
        <div className={css.cardWrap}>
            {cartProducts &&
            <div className={css.popUpWrap}>
             <div className={css.nameCountWrap}>
             <h2 className={css.countH2}>Ваш кошик ({cartProducts.length})</h2>
             <HandySvg 
             onClick={cartClose}
                    src={iconSrc}
                    width="28"
                    className={css.countSvg}
        height="28"
                    />
             </div>

             <div className={css.productInCardWrap}>
                {cartProducts.map((el, index) => {
                   return <ProdInCard key={index} el={el} removeProduct={removeProduct} handleQuantityChange={handleQuantityChange}/>
                })}
                
                
               
             </div>


             <div className={css.fullPriceBlockWrap}>
<h3 className={css.finalPrice}>Всього: {finishPrice} грн</h3>
<div className={css.buttonPriceWrap}>
    <div className={css.nextJoin}>Продовжити вибір</div>
    <div onClick={goToOrder} className={css.finalOrder}>Оформити замовлення</div>
</div>





             </div>



            </div>


}
        </div>
    

    )
}