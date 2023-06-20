import css from './product.module.css'
import {HandySvg} from 'handy-svg';
import iconSrc from '../../svg/sendMess.svg';
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, updateDoc, getDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { useEffect } from 'react';


export default function ResponsTextArea({oneProd, setReloadP, reloadP, user, setRerenderAfter, rerenderAfter}){
   const [areT, setAreaT] = useState('');
   
 const changeTextArea = (e) => {
    e.preventDefault();
    setAreaT(e.target.value)

 }
const sendVidguk = async () => {
    const uid = uuidv4();
    const frankDocRef = doc(db, 'reviews', uid);
    await setDoc(frankDocRef, {
        uid: uid,
        productId: oneProd.uid,
        vidguk: areT,
        nameAutor: '',
        autorPic: '',
        rating: 4, 
        userUid: user.uid,
        
    }
        );
        setAreaT('')
        setReloadP(!reloadP);
        try {
            const userDocRef = doc(db, 'users', user.uid);
      
      // Отримуємо попереднє значення elefant
      const userDoc = await getDoc(userDocRef);
      const previousElefant = userDoc.data().elefant;
      const elefantNumber = parseInt(previousElefant, 10);

      const newElefant1 = (oneProd.price * 5) / 100;
      
      
      const updatedElefant = elefantNumber + newElefant1;
            
            
            await updateDoc(userDocRef, { elefant: updatedElefant.toString() });
      
           alert(`Ваш відгук успішно відправлений та нараховано ${newElefant1} слонів`);
           setRerenderAfter(!rerenderAfter);
          } catch (error) {
            console.error('Error updating elefant:', error);
          }

}


    return(
        <div className={css.respTextAreaWrap}>
            <div className={css.respTextAreaWrapSmall}>
                <textarea value={areT} onChange={changeTextArea} placeholder='Залишити відгук...' className={css.textAreaStyle}>
                </textarea>
                <div className={css.sendMessage} onClick={sendVidguk}>
                <HandySvg 
                    src={iconSrc}
                    width="40.25"
        height="43.2"
                    />
                </div>
            </div>
        </div>

    )
}