import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 

import css from '../admin/adm.module.css'




export default function AddBlog() {

    const objList = [
        {
            name: "Заголовок",
            transliter: "zag",
        },
        {
            name: "Коротки опис",
            transliter: "chortDesc",
        },
        {
            name: "Довгий опис",
            transliter: "longDesc",
        },
        {
            name: "ID відео",
            transliter: "videoId",
        },
  
    ]
    const [formData, setFormData] = useState({});
//     const handleFormSubmit = (event) => {
//         event.preventDefault(); // prevent the default form submission behaviour
    
//         // Collect form data and update the state
//         const form = event.target;
        
//         const data = new FormData(form);
//         const formDataObj = Object.fromEntries(data.entries());
//         setFormData(formDataObj);
  
//         console.log('перший форм дата',formData)
//         //добавка товару якщо є два фото
//         if (formData.bookFoto.name && formData.fotoRozgort.name){
//           const newObj = formData;
//           const storageRef1 = ref(storage, formData.bookFoto.name);
//     const storageRef2 = ref(storage, formData.fotoRozgort.name);
//     const uploadTask1 = uploadBytesResumable(storageRef1, formData.bookFoto);
//     const uploadTask2 = uploadBytesResumable(storageRef2, formData.fotoRozgort);
//     uploadTask1.on('state_changed',
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('progress1', progress);
//     },
//     (error) => {
//       console.log('error uploading file1', error);
//     }
//   );
//   uploadTask2.on('state_changed',
//   (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('progress2', progress);
//   },
//   (error) => {
//     console.log('error uploading file2', error);
//   }
//   );
  
  
  
//   uploadTask1.on('state_changed', async () => {
//       const downloadURL1 = await getDownloadURL(uploadTask1.snapshot.ref);
//       uploadTask2.on('state_changed', async () => {
//         const downloadURL2 = await getDownloadURL(uploadTask2.snapshot.ref);
//         newObj.bookFoto = downloadURL1;
//         newObj.fotoRozgort = downloadURL2;
//         newObj.uid = uuidv4();
//         const frankDocRef = doc(db, 'product', newObj.uid);
//         await setDoc(frankDocRef, newObj);
//       });
//     });
  
  
          
  
  
  
//         }else if(formData.fotoRozgort.name){
//           console.log('нема імя')
//         }
  
//         // Log the form data to the console
  
        
  
        
//       };
const handleFormSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behaviour

    // Collect form data and update the state
    const form = event.target;
    const formDataValue = new FormData(form);
    const formDataObj = Object.fromEntries(formDataValue.entries());
    setFormData(formDataObj);

    

    // Добавка даних блогу
    const newObj = { ...formDataObj };
    newObj.uid = uuidv4();
    newObj.timestamp = serverTimestamp();
    const frankDocRef = doc(db, 'blog', newObj.uid);
    await setDoc(frankDocRef, newObj);

    // Очистити форму після надсилання
    alert('Ваша стаття додана')
    form.reset();
  };
  


    return(
        <div>
  <form onSubmit={handleFormSubmit}>
            {objList.map((el, index) => {
             
                    return  <div key={index} className={css.wrapSmallList}>

                    <p className={css.paramBooks}>{el.name}</p>
                     <input type="text" name={el.transliter} id='nameProp'/>
                    
                    </div>
             
             

            })}
                
<button type='submit'>Додати статтю</button>

</form>
        </div>
    )
}