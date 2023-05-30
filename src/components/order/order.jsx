import { useState, useEffect } from 'react'
import Footer from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import css from './order.module.css'
import { v4 as uuidv4 } from 'uuid';
import { getFirestore,  query, where, getDocs } from 'firebase/firestore';
import arrowImp from '../../img/arrowDownPick.png'
import {auth, db} from '../../firebase'
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import { Buffer } from 'buffer';
import sha1 from 'sha1'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import ProductInOrder from './productInOrder'
import axios from 'axios';
export default function Order() {
const [name, setName] = useState('');
const uid = uuidv4();
const [fatherName, setFatherName] = useState('');
const [surName, setSurName] = useState('');
const [phone, setPhone] = useState("");
const [nameOtr, setNameOtr] = useState('');
const [fatherNameOtr, setFatherNameOtr] = useState('');
const [surNameOtr, setSurNameOtr] = useState('');
const [phoneOtr, setPhoneOtr] = useState("");
const [selectedCity, setSelectedCity] = useState();
const [isNewBuyer, setIsNewBuyer] = useState(true);
const [ulVisible, setUlVisible] = useState(false);
const [departments, setDepartments] = useState([]);
const [visibleForm, setVisibleForm] = useState(false);
const [whatSelect, setWhatSelect] = useState(0)
const [dataFromBase, setDataFromBase] = useState(null);
const [promo, setPromo] = useState('');
const [fullPrice, setFullPrice] = useState();
const [user, setUser] = useState('');
const [depo, setDepo] = useState('');
const [selectedDepartment, setSelectedDepartment] = useState('');
const [countProductForCart, setCountProductForCart] = useState([]);
const handleNewBuyerClick = () => {
  setIsNewBuyer(true);
};

const handleAlwaysBuyerClick = () => {
  setIsNewBuyer(false);
};

const handleSelectChange = (event) => {
    const selectedIndex = event.target.value;
    const selectedDepartmentName = departments[selectedIndex]?.Description || '';
    setSelectedDepartment(selectedDepartmentName);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const db = getFirestore();
      const usersRef = collection(db, 'users');
      if(user){
      const q = query(usersRef, where('uid', '==', user.uid));
      
      try {
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // Отримайте дані документа
            const userData = doc.data();
            console.log('userData',userData)
           
            if(userData.phone){
            setPhone(userData.phone);
            setDataFromBase(userData);
            setName(userData.name);
          }
           
          });
        } else {
          // Документ не знайдено
          setUser(null);
        }
      } catch (error) {
        console.log('Помилка під час отримання даних:', error);
      }
    }
  
  
    };
  
    fetchUser();
  }, [user]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
       
        // Користувач увійшов в систему
        setUser(currentUser);
      } else {
        // Користувач вийшов з системи
    
        
        setUser(null);
      }
    });
   

    return () => {
      // Відписка від слухача після розмонтовування компоненти
      unsubscribe();
    };
  },[])
  const generateSignature = () => {
    const publicKey = 'sandbox_i47427856209';
    const privateKey = 'sandbox_nLRix8HatIf5clJkORUvGIFrNFCgRbbjOZQnneIK';

    const params = {"public_key": publicKey,"version":"3","action":"pay","amount":finishPrice,"currency":"UAH","description":"test","order_id":uid}

    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    const fi = privateKey + data + privateKey;
    const signString = privateKey + data + privateKey;
    const hash = sha1(signString);
    const signature = Buffer.from(hash, 'hex').toString('base64');

    
    return { data, signature };
  };
const [choisDostavka, setChoisDostavka] = useState(true);
//Другі контактні данні
const nameChangeOtr = (e) => {
const na = e.target.value;
setNameOtr(na)
}
const fatherNameChangeOtr = (e) => {
    const fa = e.target.value;
    setFatherNameOtr(fa)
    }
    const surNameChangeOtr = (e) => {
        const sa = e.target.value;
        setSurNameOtr(sa)
        }
        const handlePhoneChangeOtr  = (event) => {
            const newPhone = event.target.value;
        
            // Перевірка, чи починається телефонний номер на +380
            if (newPhone.startsWith("")  && newPhone.length <= 13) {
              setPhoneOtr(newPhone);
            }
        }

//Перші контактні дані
const nameChange = (e) => {
    const na = e.target.value;
    setName(na)
    }
    const fatherNameChange = (e) => {
        const fa = e.target.value;
        setFatherName(fa)
        }
        const surNameChange = (e) => {
            const sa = e.target.value;
            setSurName(sa)
            }
            const handlePhoneChange  = (event) => {
                const newPhone = event.target.value;
    
        // Перевірка, чи починається телефонний номер на +380
        if (newPhone.startsWith("")  && newPhone.length <= 13) {
          setPhone(newPhone);
        }
            }
            


        const [selectedOption, setSelectedOption] = useState(null);

        const handleOptionClick = (option) => {
          setSelectedOption(option);
        };

        //код для виведення міста
        const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const handleInputChange = async (event) => {
    const inputCityName = event.target.value;
    setCityName(inputCityName);
    setUlVisible(true)
    try {
      const apiKey = 'f579aac88b980dff3f819958ce1cbca6';
      const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
      const requestData = {
        apiKey,
        modelName: "Address",
        calledMethod: "getCities",
    methodProperties: {
            FindByString: inputCityName
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
       console.log('Response', response)
      const data = await response.json();
      const citiesList = data.data || [];
    
      setCities(citiesList);

      console.log('Міста', cities);
    } catch (error) {
      console.error('Error searching cities:', error);
    }
  };
  
  const handleCityClick = (city) => {
    setSelectedCity(city);
    setCityName(city.Description);
    setCities([]);
    setUlVisible(false)
    fetchDepartments(city.Ref)
    console.log(city)
  };
  const fetchDepartments = async (ref) => {
    try {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey: 'f579aac88b980dff3f819958ce1cbca6',
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: ref
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const warehouses = data.data;
        console.log(warehouses)
        setDepartments(warehouses);
      } else {
        console.error('Error fetching Nova Poshta departments');
      }
    } catch (error) {
      console.error('Error fetching Nova Poshta departments', error);
    }
  };

// все для продуктів в корзині
const [products, setProducts] = useState([]);
const [haveProduct, setHaveProduct] = useState(false);
const [cartProducts, setCartProducts] = useState();
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
    // заключаючий
const promoFunc = () => {

}
// перевірка оплати
const handleChange = (event) => {
    const selectedValue = event.target.value;
    
    if (selectedValue === '2') {
        setVisibleForm(true)
        setWhatSelect(1)
        console.log('Зайшло і поміняло форму')
    }else  if (selectedValue === '1' || selectedValue === '0') {
        setWhatSelect(0)
    }

  };
  //Оплатва
  const payParam = async (e) => {
    e.preventDefault();
    console.log('Інвалід дата not json', cartProducts)
    const json = JSON.stringify(cartProducts);
  
  let us = '';
  
  if (user){
    us = user.uid;
   
  }
  console.log('Інвалід дата', us)
    if(whatSelect === 1){
      try {
          // Створюємо об'єкт документу для запису в Firestore
          const newProduct = {
            uid: uid,
            choice: json,
            totalPrice: finishPrice,
            phone: phone,
            name: name,
            fatherName: fatherName,
            surName:surName,
            nameOtr,
            fatherNameOtr,
            surNameOtr,
            phoneOtr,
            isNewBuyer,
            cityName,
            selectedDepartment,
            pay: 'card',
            paymentStatus: 'false',
            user: us,
            status: 'Очікує підтвердження'
            // Додайте інші поля форми за необхідності
          };
    
          // Записуємо новий продукт в Firestore
         // const docRef = await addDoc(collection(db, 'orders'), newProduct);
          const frankDocRef = doc(db, 'orders', uid);
      await setDoc(frankDocRef, newProduct);
          console.log('Документ успішно додано з ID:', );
        } catch (error) {
          console.error('Помилка при додаванні документа:', error);
        }
      const { data, signature } = generateSignature();
  
      const form = document.getElementById('liqpay-form');
    
      form.elements.data.value = data;
      form.elements.signature.value = signature;
      form.submit();
    }else if(whatSelect === 0){
      try {
          // Створюємо об'єкт документу для запису в Firestore
          const newProduct = {
            uid: uid,
            choice: json,
            totalPrice: finishPrice,
            phone: phone,
            name: name,
            fatherName: fatherName,
            surName:surName,
            nameOtr,
            fatherNameOtr,
            surNameOtr,
            phoneOtr,
            isNewBuyer,
            cityName,
            selectedDepartment,
            pay: 'cash',
            paymentStatus: 'false',
            user: us,
            status: 'Очікує підтвердження'
            // Додайте інші поля форми за необхідності
          };
    
          // Записуємо новий продукт в Firestore
          //const docRef = await addDoc(collection(db, 'orders'), newProduct);
          const frankDocRef = doc(db, 'orders', uid);
      await setDoc(frankDocRef, newProduct);
          console.log('Документ успішно додано з ID:');
        } catch (error) {
          console.error('Помилка при додаванні документа:', error);
        }
  
  
  
    }
    localStorage.removeItem('cart');
   
   
  }

const apiKey = 'f579aac88b980dff3f819958ce1cbca6';
      const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
      const ttnNumber = '20450715436175'; 
      useEffect(() => {
        const trackPackageByTtn = async () => {
          try {
            const response = await axios.post(apiUrl, {
              apiKey: apiKey,
              modelName: 'TrackingDocument',
              calledMethod: 'getStatusDocuments',
              methodProperties: {
                Documents: [
                  {
                    DocumentNumber: ttnNumber,
                  },
                ],
              },
            });
    
            const status = response.data.data[0].Status;
    
            console.log('Статус посилки:', status);
          } catch (error) {
            console.error('Помилка при відстеженні посилки:', error.message);
          }
        };
    
        trackPackageByTtn();
      }, []);
    

    return(
        <>
        <Header/>
<div className={css.blueHeaderOrder}>
    <div className={css.blueHeaderOrderEnter}>
        <h3 className={css.titleH3OrderEnter}>Оформлення замовлення</h3>
    </div>
</div>

<div className={css.wrapCenterOrder}>
<div className={css.wrapCenterOrderSmall}>

<div className={css.firstBlockWrap}>
    <div className={css.newUserOrNoWrap}>
    <div
        className={`${css.newAlwaysBayer} ${isNewBuyer ? css.newBayer : ''}`}
        onClick={handleNewBuyerClick}
      >
        Я новий покупець
      </div>
      <div
        className={`${css.newAlwaysBayer} ${!isNewBuyer ? css.newBayer : ''}`}
        onClick={handleAlwaysBuyerClick}
      >
        Я постійний покупець
      </div>
    </div>
<p className={css.labelMi}>
    Особисті дані
</p>
<div className={css.wrapUserData}>
<input className={css.inputSmall} type='text' placeholder="Ім'я" value={name} onChange={nameChange}/>
<input className={css.inputSmall} type='text' placeholder="По-батькові" value={fatherName} onChange={fatherNameChange}/>
<input className={css.inputBig} type='text' placeholder="Прізвище" value={surName} onChange={surNameChange}/>
<input className={css.inputBig} type="tel" placeholder="Телефон" value={phone} onChange={handlePhoneChange} required/>
</div>
<div className={css.deliveryChoisWrap}>
<div className={css.choisWrap} onClick={() => handleOptionClick('Доставка')}>
        <div className={css.choisWi}>
          {selectedOption === 'Доставка' && <div className={css.wi}></div>}
        </div>
        <p className={css.choisP}>Доставка</p>
      </div>
      <div className={css.choisWrap} onClick={() => handleOptionClick('Самовивіз')}>
        <div className={css.choisWi}>
          {selectedOption === 'Самовивіз' && <div className={css.wi}></div>}
        </div>
        <p className={css.choisP}>Самовивіз</p>
      </div>
</div>
{choisDostavka &&
    <div className={css.wrapUserData}>
<div className={css.chousBooksSelect}>
  <select className={css.customSelect} >
    <option className={css.customOpin} value="0">Країна</option>
    <option className={css.customOpin} value="1">Україна</option>
   
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>

<div className={css.chousBooksSelect}>
<input
        className={css.inputSmallWrap}
        type="text"
        value={cityName}
        onChange={handleInputChange}
        placeholder="Місто"
      />
{ulVisible && 
      <ul className={css.ulWrapBigCity}>
        {cities.length > 0 &&
        cities.map((city, index) => {

             return  <li onClick={() => handleCityClick(city)} key={index}>{city.SettlementTypeDescription},{city.Description}, {city.AreaDescription}</li>

            })}
      </ul>
      }
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
<div className={css.chousBooksSelectBig}>
  <select className={css.customSelect} >
    <option className={css.customOpin} value="0">Спосіб доставки</option>
    <option className={css.customOpin} value="1">Нова пошта</option>
    
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
<div className={css.chousBooksSelectBig}>
  <select className={css.customSelect} onChange={handleSelectChange}>
    <option className={css.customOpin} value="0">Нова пошта номер</option>
   {departments.map((el, index) => {
  return  <option  className={css.customOpin} key={index} value={index}>{el.Description}</option>
   })}
    
    
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
<div className={css.chousBooksSelectBig}>
  <select className={css.customSelect} onChange={handleChange}>
    <option className={css.customOpin} value="0">Спосіб оплати</option>
    <option className={css.customOpin} value="1">Готівка</option>
    <option className={css.customOpin} value="2">Карта</option>
  </select>
  <img src={arrowImp} className={css.customArrowSelect} />
</div>
{visibleForm &&
                              <form id="liqpay-form" onSubmit={payParam} method="POST" action="https://www.liqpay.ua/api/3/checkout" 
                              acceptСharset="utf-8">
                              <input type="hidden" name="data" value=""/>
                              <input type="hidden" name="signature" value=""/>
                             
                              </form>
                            }
</div>

}




<p className={css.labelMi}>
    Контактні дані отримувача
</p>
<div className={css.wrapUserData}>
<input className={css.inputSmall} type='text' placeholder="Ім'я" value={nameOtr} onChange={nameChangeOtr}/>
<input className={css.inputSmall} type='text' placeholder="По-батькові" value={fatherNameOtr} onChange={fatherNameChangeOtr}/>
<input className={css.inputBig} type='text' placeholder="Прізвище" value={surNameOtr} onChange={surNameChangeOtr}/>
<input className={css.inputBig} type="tel" placeholder="Телефон" value={phoneOtr} onChange={handlePhoneChangeOtr} required/>
</div>

<button className={css.orderConfirmation} onClick={payParam}>Оформити замовлення</button>





</div>



<div className={css.wrapProdForOrder}>

{cartProducts &&
cartProducts.map((el, index) => {
                   return <ProductInOrder key={index} el={el} removeProduct={removeProduct} handleQuantityChange={handleQuantityChange}/>
                })}

                <div className={css.lineWrap}></div>
                <p className={css.sumOrder}>Всього: {finishPrice} грн</p>
                <p className={css.sumOrder}>Знижка: 0 грн</p>
                <div className={css.discountWrapOrder}>
                <input className={css.promoInput} type='text' placeholder="Промокод" value={promo} onChange={promoFunc}/>
                <div className={css.promoButton}>
                    Застосувати
                </div>
                </div>
                <p className={css.sum}>Сума: {finishPrice} грн</p>


</div>











</div>




</div>






        <Footer/>

        </>
    )
}