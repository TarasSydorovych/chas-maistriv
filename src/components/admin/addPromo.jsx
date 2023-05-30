import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
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
    <form onSubmit={handleFormSubmit}>
      <label>
        UID промокоду:
        <input type="text" value={uid} onChange={(e) => setUid(e.target.value)} />
      </label>
      <button onClick={generateId}>Згенерувати код</button>
      <label>
        Знижка (%):
        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>
      <button type="submit">Зберегти</button>
    </form>
  );
}