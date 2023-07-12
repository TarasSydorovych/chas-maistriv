import { useState } from 'react';
import { collection, query, onSnapshot, updateDoc, doc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import css from './adm.module.css';

const SeoBlock = () => {
    const [formData, setFormData] = useState({
        mainTitle: '',
        mainDescription: '',
        mainKeyWords: '',
        catalogTitle: '',
        catalogDescription: '',
        catalogKeyWords: '',
        priceOptTitle: '',
        priceOptDescription: '',
        priceOptKeyWords: '',
        maistruTitle: '',
        maistruDescription: '',
        maistruKeyWords: '',
        heroesTitle: '',
        heroesDescription: '',
        heroesKeyWords: '',
        blogTitle: '',
        blogDescription: '',
        blogKeyWords: '',
        manuscriptTitle: '',
        manuscriptDescription: '',
        manuscriptKeyWords: '',
        videoWiewTitle: '',
        videoWiewDescription: '',
        videoWiewKeyWords: '',
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const existingDocument = await checkExistingDocument();
        if (existingDocument) {
          await updateDocument(existingDocument._id, formData);
        } else {
          await addDocument(formData);
        }
    
        resetForm();
      };
    
      const checkExistingDocument = async () => {
        try {
          const seoCollectionRef = collection(db, 'seo');
          const seoSnapshot = await getDocs(seoCollectionRef);
    
          if (seoSnapshot.size > 0) {
            // Якщо в колекції вже є документи, поверніть перший документ зі списку
            return { id: seoSnapshot.docs[0].id, ...seoSnapshot.docs[0].data() };
          }
    
          return null;
        } catch (error) {
          // Обробка помилки, якщо не вдалося виконати запит до бази даних
          console.error('Помилка отримання документів:', error);
          return null;
        }
      };
    
      const updateDocument = async (documentId, updatedData) => {
        try {
          const seoDocRef = doc(db, 'seo', documentId);
          await updateDoc(seoDocRef, updatedData);
    
          console.log('Документ оновлено:', updatedData);
        } catch (error) {
          // Обробка помилки, якщо не вдалося оновити документ
          console.error('Помилка оновлення документа:', error);
        }
      };
    
      const addDocument = async (newData) => {
        try {
          const seoCollectionRef = collection(db, 'seo');
          await addDoc(seoCollectionRef, newData);
    
          console.log('Новий документ додано:', newData);
        } catch (error) {
          // Обробка помилки, якщо не вдалося додати новий документ
          console.error('Помилка додавання нового документа:', error);
        }
      };
    
      const resetForm = () => {
        setFormData({
          mainTitle: '',
          mainDescription: '',
          mainKeyWords: '',
          catalogTitle: '',
          catalogDescription: '',
          catalogKeyWords: '',
          priceOptTitle: '',
          priceOptDescription: '',
          priceOptKeyWords: '',
          maistruTitle: '',
          maistruDescription: '',
          maistruKeyWords: '',
          heroesTitle: '',
          heroesDescription: '',
          heroesKeyWords: '',
          blogTitle: '',
          blogDescription: '',
          blogKeyWords: '',
          manuscriptTitle: '',
          manuscriptDescription: '',
          manuscriptKeyWords: '',
          videoWiewTitle: '',
          videoWiewDescription: '',
          videoWiewKeyWords: '',
        });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="mainTitle">Main Title</label>
          <input
            type="text"
            id="mainTitle"
            name="mainTitle"
            value={formData.mainTitle}
            onChange={handleInputChange}
          />
    
          <label htmlFor="mainDescription">Main Description</label>
          <input
            type="text"
            id="mainDescription"
            name="mainDescription"
            value={formData.mainDescription}
            onChange={handleInputChange}
          />
    
          {/* Додайте решту полів форми з відповідними значеннями formData */}
    
          <button type="submit">Submit</button>
        </form>
      );
};

export default SeoBlock;