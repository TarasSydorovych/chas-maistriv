import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import {auth, db} from '../../firebase'


const withFirebaseCollectionReserv = (collectionName) => (WrappedComponent) => {
    const WithFirebaseCollectionReserv = (props) => {
      const [product, setProduct] = useState([]);
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setProduct(fetchedData);
          } catch (error) {
            console.error('Помилка при отриманні документів:', error);
          }
        };
  
        fetchData();
      }, []);
  
      return <WrappedComponent product={product} {...props} />;
    };
  
    return WithFirebaseCollectionReserv;
  };
  
  export default withFirebaseCollectionReserv;