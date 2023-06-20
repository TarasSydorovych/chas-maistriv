import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import {auth, db} from '../../firebase'

// const withFieldData = (fieldName) => (WrappedComponent) => {
//   const WithFieldData = (props) => {
    
//     const [products, setProducts] = useState([]);
//     useEffect(() => {
//       const fetchData = async () => {
//         const q = query(collection(db, 'product'), where(fieldName, '==', 'true'));
//         const querySnapshot = await getDocs(q);
        
//         const fetchedData = [];
//         querySnapshot.forEach((doc) => {
//           fetchedData.push(doc.data());
//         });

//         setProducts(fetchedData);
//       };

//       fetchData();
//     }, []);

//     return <WrappedComponent products={products} {...props} />;
//   };

//   return WithFieldData;
// };

// export default withFieldData;

const WithFieldData = (fieldName, collectionName, fieldValue) => (WrappedComponent) => {
  const WithFieldData = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const q = query(collection(db, collectionName), where(fieldName, '==', fieldValue));
        const querySnapshot = await getDocs(q);

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });

        setProducts(fetchedData);
      };

      fetchData();
    }, []);

    return <WrappedComponent products={products} {...props} />;
  };

  return WithFieldData;
};

export default WithFieldData;