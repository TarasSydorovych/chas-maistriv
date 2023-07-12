import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import css from './adm.module.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        const userList = [];
        snapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      });
  
      return () => unsubscribe(); // Відписка від прослуховування при виході з компоненти
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
  
    return (
      <ul className={css.userListWrapUL}>
        {users.map((user) => (
          <li key={user.id} className={css.userListWrapLi}>
            <p onDoubleClick={() => handleDoubleClick(user)} className={css.userListWrapP}>
              {editedUser?.id === user.id ? (
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
              {editedUser?.id === user.id ? (
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
              {editedUser?.id === user.id ? (
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
              {editedUser?.id === user.id ? (
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
{editedUser?.id === user.id ? (
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
{editedUser?.id === user.id ? (
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
</li>
))}
</ul>
);
};

export default UserList;