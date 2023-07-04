import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import css from './adm.module.css';
import { v4 as uuidv4 } from 'uuid';
export default function AddPromo() {
  const [uid, setUid] = useState('');
  const [discount, setDiscount] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Перевірка, чи існує документ promo в колекції
    const promoDocRef = doc(db, 'promo', 'promo-document');
    const promoDocSnapshot = await getDoc(promoDocRef);

    if (promoDocSnapshot.exists()) {
      // Оновлення документа promo з новими значеннями
      await setDoc(promoDocRef, { uid, discount });
      console.log('Документ promo оновлено.');
    } else {
      // Створення нового документа promo з значеннями uid та discount
      await setDoc(promoDocRef, { uid, discount });
      console.log('Документ promo створено.');
    }
  };
const generateId = () => {
const id = uuidv4();
setUid(id);
}
useEffect(() => {
    const fetchPromoData = async () => {
      // Отримання документа "promo" з колекції
      const promoDocRef = doc(db, 'promo', 'promo-document');
      const promoDocSnapshot = await getDoc(promoDocRef);

      if (promoDocSnapshot.exists()) {
        // Оновлення стану з отриманими значеннями
        const promoData = promoDocSnapshot.data();
        setUid(promoData.uid);
        setDiscount(promoData.discount);
      }
    };

    fetchPromoData();
  }, []);

  return (
    <form className={css.faromToPromo} onSubmit={handleFormSubmit}>
      <div className={css.promoWrapOne}>
      <label className={css.labelPromo}> 
        UID промокоду:
        <input className={css.promoInput} type="text" value={uid} onChange={(e) => setUid(e.target.value)} />
      </label>
      <button className={css.promoBut} onClick={generateId}>Згенерувати код</button>
      </div>
      <div className={css.promoWrapTwo}>
      <label className={css.labelPromo}>
        Знижка (%):
        <input className={css.promoInput} type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>
      <button className={css.promoBut} type="submit">Зберегти</button>
      </div>
    </form>
  );
}