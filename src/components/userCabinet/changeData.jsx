import css from './userCabinet.module.css'
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import iconSrc from '../../svg/xCardIcon.svg';
import {HandySvg} from 'handy-svg';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore"; 

export default function ChangeData({scrollHeight, userBd, setCheSetinings}) {
    const productBigWrapRef = useRef(null);
    const [name, setName] = useState(userBd.displayName)
    const [email, setEmail] = useState(userBd.email);
    const [tgId, setTgId] = useState(userBd.telegramId);
    const [phone, setPhone] = useState(userBd.phone);
const [file, setFile] = useState(null)

    useEffect(() => {
        const productBigWrapElement = productBigWrapRef.current;
        if (productBigWrapElement) {
            productBigWrapElement.style.top = `${scrollHeight}px`;
        }
    
    },[productBigWrapRef])
const closeSet = () => {
    setCheSetinings(false)
}
const changeDataFunc = async () => {
    if (file) {
        // Якщо файл існує, тоді завантажуємо його в Firebase Storage
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `users/${userBd.uid}/profile-photo`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Відстежування процесу завантаження (необов'язково)
                },
                (error) => {
                    // Помилка під час завантаження (необов'язково)
                    console.error('Помилка завантаження файлу:', error);
                },
                async () => {
                    // Завантаження завершено успішно
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    // Тепер ми маємо отримати URL завантаженого файлу

                    // Тепер оновимо дані в Firestore з отриманим URL
                    const frankDocRef = doc(db, 'users', userBd.uid);
                   

                    try {
                        await updateDoc(frankDocRef, {
                            photo: downloadURL, // Оновлюємо поле photo з URL зображення
                            displayName: name, // Оновлюємо поле displayName
                            email: email, // Оновлюємо поле email
                            telegramId: tgId, // Оновлюємо поле telegramId
                            phone: phone // Оновлюємо поле phone
                        });
                        console.log('Дані успішно оновлено в Firestore!');
                    } catch (error) {
                        console.error('Помилка оновлення даних в Firestore:', error);
                    }
                }
            );
        } catch (error) {
            console.error('Помилка завантаження зображення в Firebase Storage:', error);
        }
    } else {
        // Якщо файлу немає, тоді просто оновлюємо інші дані в Firestore
      
        const frankDocRef = doc(db, 'users', userBd.uid);
      
        try {
            await updateDoc(frankDocRef, {
                displayName: name, // Оновлюємо поле displayName
                email: email, // Оновлюємо поле email
                telegramId: tgId, // Оновлюємо поле telegramId
                phone: phone // Оновлюємо поле phone
            });
            console.log('Дані успішно оновлено в Firestore!');
        } catch (error) {
            console.error('Помилка оновлення даних в Firestore:', error);
        }
    }
}

    return(
        <div className={css.changeDataWrap}>
<div className={css.changeDataWrapSmall}>
<div className={css.nameCountWrap}>
<h2 className={css.countH2}>Особиста інформація</h2>
             <HandySvg 
                    src={iconSrc}
                    width="28"
                    className={css.countSvg}
        height="28"
     onClick={closeSet}
                    />
             </div>
             <div className={css.inputWrapCard}>
                <div className={css.wrapInput}>
                    <p className={css.inputChangeName}>Ім'я</p>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={css.wrapInput}>
                    <p className={css.inputChangeName}>Email</p>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={css.wrapInput}>
                    <p className={css.inputChangeName}>Телеграм ID</p>
                    <input type='text' value={tgId} onChange={(e) => setTgId(e.target.value)}/>
                </div>
                <div className={css.wrapInput}>
                    <p className={css.inputChangeName}>Телефон</p>
                    <input type='phone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className={css.wrapInput}>
                    <p className={css.inputChangeName}>Телефон</p>
                    <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])}/>
                </div>
             </div>
             <button onClick={changeDataFunc} className={css.likeButtonChange}>Обновити данні</button>
</div>
        </div>
    )
}






