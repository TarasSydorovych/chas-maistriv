import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import css from './adm.module.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [editedUser, setEditedUser] = useState(null);
  
//     useEffect(() => {
//       const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
//         const userList = [];
//         snapshot.forEach((doc) => {
//           userList.push({ id: doc.id, ...doc.data() });
//         });
//         setUsers(userList);
//       });
  
//       return () => unsubscribe(); // Відписка від прослуховування при виході з компоненти
//     }, []);
  
//     const handleDoubleClick = (user) => {
//       setEditedUser(user);
//     };
  
//     const handleInputChange = (e) => {
//       setEditedUser((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.value,
//       }));
//     };
  
//     const handleInputBlur = async (id) => {
//       try {
//         await updateDoc(doc(db, 'users', id), editedUser);
//         setEditedUser(null);
//       } catch (error) {
//         console.log('Помилка при оновленні документа: ', error);
//       }
//     };
  
//     return (
//       <ul className={css.userListWrapUL}>
//         {users.map((user) => (
//           <li key={user.id} className={css.userListWrapLi}>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="displayName"
//                   value={editedUser.displayName}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Ім'я: </span>
//                   {user.displayName}
//                 </>
//               )}
//             </p>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="email"
//                   value={editedUser.email}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Email: </span>
//                   {user.email}
//                 </>
//               )}
//             </p>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="phone"
//                   value={editedUser.phone}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Телефон: </span>
//                   {user.phone}
//                 </>
//               )}
//             </p>
//             <section className={css.userListWrapP}>
//               <label>Роль: </label>
//               {editedUser?.id === user.id ? (
//                 <select
//                   name="category"
//                   value={editedUser.category}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 >
//                   <option value="Читач">Читач</option>
//                   <option value="Член &quot;Клубу Майстрів&quot;">Член "Клубу Майстрів"</option>
//                   <option value="Бібліотекар">Бібліотекар</option>
// <option value="Дропшипінг">Дропшипінг</option>
// <option value="Гурт-закупка">Гурт-закупка</option>
// <option value="Бізнес-партнер">Бізнес-партнер</option>
// </select>
// ) : (
// <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
// {user.category}
// </p>
// )}
// </section>
// <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
// {editedUser?.id === user.id ? (
// <input
// type="text"
// name="discount"
// value={editedUser.discount}
// onChange={handleInputChange}
// onBlur={() => handleInputBlur(user.id)}
// />
// ) : (
// <>
// <span>Знижка: </span>
// {user.discount}
// </>
// )}
// </p>
// <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
// {editedUser?.id === user.id ? (
// <input
// type="text"
// name="elefant"
// value={editedUser.elefant}
// onChange={handleInputChange}
// onBlur={() => handleInputBlur(user.id)}
// />
// ) : (
// <>
// <span>Слони: </span>
// {user.elefant}
// </>
// )}
// </p>
// </li>
// ))}
// </ul>
// );
// };

// export default UserList;



// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [editedUser, setEditedUser] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
//       const userList = [];
//       snapshot.forEach((doc) => {
//         userList.push({ id: doc.id, ...doc.data() });
//       });
//       setUsers(userList);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleDoubleClick = (user) => {
//     setEditedUser(user);
//   };

//   const handleInputChange = (e) => {
//     setEditedUser((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleInputBlur = async (id) => {
//     try {
//       await updateDoc(doc(db, 'users', id), editedUser);
//       setEditedUser(null);
//     } catch (error) {
//       console.log('Помилка при оновленні документа: ', error);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const filteredUsers = selectedCategory
//     ? users.filter((user) => user.category === selectedCategory)
//     : users;

//   return (
//     <div>
//       <section>
//         <label>Оберіть категорію: </label>
//         <select name="category" value={selectedCategory} onChange={handleCategoryChange}>
//           <option value="">Всі</option>
//           <option value="Читач">Читач</option>
//           <option value="Член &quot;Клубу Майстрів&quot;">Член "Клубу Майстрів"</option>
//           <option value="Бізнес-партнер">Бізнес-партнер</option>
//           <option value="Майстер">Майстер</option>
//         </select>
//       </section>
//       <ul className={css.userListWrapUL}>
//         {filteredUsers.map((user) => (
//           <li key={user.id} className={css.userListWrapLi}>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="displayName"
//                   value={editedUser.displayName}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Ім'я: </span>
//                   {user.displayName}
//                 </>
//               )}
//             </p>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="email"
//                   value={editedUser.email}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Email: </span>
//                   {user.email}
//                 </>
//               )}
//             </p>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="phone"
//                   value={editedUser.phone}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Телефон: </span>
//                   {user.phone}
//                 </>
//               )}
//             </p>
//             <section className={css.userListWrapP}>
//               <label>Роль: </label>
//               {editedUser?.id === user.id ? (
//                 <select
//                   name="category"
//                   value={editedUser.category}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 >
//                   <option value="Читач">Читач</option>
//                   <option value="Член &quot;Клубу Майстрів&quot;">Член "Клубу Майстрів"</option>
//                   <option value="Бібліотекар">Бібліотекар</option>
//                   <option value="Дропшипінг">Дропшипінг</option>
//                   <option value="Гурт-закупка">Гурт-закупка</option>
//                   <option value="Бізнес-партнер">Бізнес-партнер</option>
//                 </select>
//               ) : (
//                 <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//                   {user.category}
//                 </p>
//               )}
//             </section>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="discount"
//                   value={editedUser.discount}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Знижка: </span>
//                   {user.discount}
//                 </>
//               )}
//             </p>
//             <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
//               {editedUser?.id === user.id ? (
//                 <input
//                   type="text"
//                   name="elefant"
//                   value={editedUser.elefant}
//                   onChange={handleInputChange}
//                   onBlur={() => handleInputBlur(user.id)}
//                 />
//               ) : (
//                 <>
//                   <span>Слони: </span>
//                   {user.elefant}
//                 </>
//               )}
//             </p>
//             {user.category === 'Бізнес-партнер' && (
//               <p>
//                 <span>Посилання на PDF: </span>
//                 <a href={user.pdfAct} download>
//                   Завантажити
//                 </a>
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList = [];
      snapshot.forEach((doc) => {
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userList);
    });
    return () => unsubscribe();
  }, []);

  const handleDoubleClick = (user) => {
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    setEditedUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputBlur = async (id) => {
    try {
      await updateDoc(doc(db, 'users', id), editedUser);
      setEditedUser(null);
    } catch (error) {
      console.log('Помилка при оновленні документа: ', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePdfUpload = async (id, file) => {
    try {
      const storageRef = ref(storage, `pdf/${id}/${file.name}`); // Отримати посилання на потрібну папку у Storage
      const uploadTask = uploadBytesResumable(storageRef, file); // Завантажити файл до Storage
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progress:', progress);
        },
        (error) => {
          console.log('Error uploading file:', error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref); // Отримати посилання на завантажений файл
          await updateDoc(doc(db, 'users', id), { pdfAct: downloadUrl }); // Оновити поле pdfAct у документі
        }
      );
    } catch (error) {
      console.log('Помилка при завантаженні PDF-файлу: ', error);
    }
  };

  const filteredUsers = selectedCategory
    ? users.filter((user) => user.category === selectedCategory)
    : users;

  return (
    <div>
      <section>
        <label>Оберіть категорію: </label>
        <select name="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Всі</option>
          <option value="Читач">Читач</option>
          <option value="Член &quot;Клубу Майстрів&quot;">Член "Клубу Майстрів"</option>
          <option value="Бізнес-партнер">Бізнес-партнер</option>
          <option value="Майстер">Майстер</option>
        </select>
      </section>
      <ul className={css.userListWrapUL}>
        {filteredUsers.map((user) => {
          const isEditing = editedUser && editedUser.id === user.id;
          return (
            <li key={user.id} className={css.userListWrapLi}>
              <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={editedUser.displayName}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(user.id)}
                  />
                ) : (
                  <>
                    <span>Ім'я: </span>
                    {user.displayName}
                  </>
                )}
              </p>
              <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
                {isEditing ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(user.id)}
                  />
                ) : (
                  <>
                    <span>Email: </span>
                    {user.email}
                  </>
                )}
              </p>
              <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(user.id)}
                  />
                ) : (
                  <>
                    <span>Телефон: </span>
                    {user.phone}
                  </>
                )}
              </p>
              <section className={css.userListWrapP}>
                <label>Роль: </label>
                {isEditing ? (
                  <select
                    name="category"
                    value={editedUser.category}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(user.id)}
                  >
                    <option value="Читач">Читач</option>
                    <option value="Член &quot;Клубу Майстрів&quot;">Член "Клубу Майстрів"</option>
                    <option value="Бібліотекар">Бібліотекар</option>
                    <option value="Дропшипінг">Дропшипінг</option>
                    <option value="Гурт-закупка">Гурт-закупка</option>
                    <option value="Бізнес-партнер">Бізнес-партнер</option>
                  </select>
                ) : (
                  <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
                    {user.category}
                  </p>
                )}
              </section>
              <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
                {isEditing ? (
                  <input
                    type="text"
                    name="discount"
                    value={editedUser.discount}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(user.id)}
                  />
                ) : (
                  <>
                    <span>Знижка: </span>
                    {user.discount}
                  </>
                )}
              </p>
              <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
                {isEditing ? (
                  <input
                    type="text"
                    name="elefant"
                    value={editedUser.elefant}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur(user.id)}
                  />
                ) : (
                  <>
                    <span>Слони: </span>
                    {user.elefant}
                  </>
                )}
              </p>
              {user.category === 'Бізнес-партнер' && (
                <p>
                  <span>Посилання на PDF: </span>
                  {isEditing ? (
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handlePdfUpload(user.id, e.target.files[0])}
                      />
                    ) : (
                      <>
                          <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handlePdfUpload(user.id, e.target.files[0])}
                      />
                      </>
                    )}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

export default UserList;