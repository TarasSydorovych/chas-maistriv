import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const withUserData = (WrappedComponent) => {
  const WithUserData = () => {
    const [user, setUser] = useState(null);
    const [discountInHok, setDiscountInHok] = useState(null);
    const [phone, setPhone] = useState(null);
    const [dataFromBase, setDataFromBase] = useState(null);
    const [name, setName] = useState(null);
    const [userBd, setUserBd] = useState('');
    useEffect(() => {
      const fetchUser = async () => {
        const usersRef = collection(db, 'users');
        if (user) {
          const q = query(usersRef, where('uid', '==', user.uid));
          try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                setUserBd(userData)
                setDiscountInHok(parseInt(userData.discount));
                if (userData.phone) {
                  setPhone(userData.phone);
                  setDataFromBase(userData);
                  setName(userData.name);
                }
              });
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error('Помилка під час отримання даних:', error);
          }
        }
      };

      fetchUser();
    }, [user]);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      });

      return () => {
        unsubscribe();
      };
    }, []);

    // Передайте дані користувача як пропси до обгортаного компонента
    return (
      <WrappedComponent
        user={user}
        discountInHok={discountInHok}
        phone={phone}
        dataFromBase={dataFromBase}
        name={name}
        userBd={userBd}
      />
    );
  };

  return WithUserData;
};

export default withUserData;