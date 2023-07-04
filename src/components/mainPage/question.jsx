import pictureQuestion from '../../img/pictureQuestion.png'
import './mainPage.css'
import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import {auth, db} from '../../firebase'
import { setDoc } from 'firebase/firestore';
// export default function Question() {

//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
//     const [surveys, setSurveys] = useState([]);

//     useEffect(() => {
//       // Отримання документів з колекції "surveys" з Firebase
//       const fetchSurveys = async () => {
       
//         const surveysRef = collection(db, 'surveys');
//         const surveysSnapshot = await getDocs(surveysRef);
//         const surveysData = [];
//         surveysSnapshot.forEach((doc) => {
//           surveysData.push({ id: doc.id, ...doc.data() });
//         });
//         setSurveys(surveysData);
//         console.log('surveysData', surveysData);
//       };
  
//       fetchSurveys();
//     }, []);


//     return(
//      <div className="questionWrap">
//         {surveys.length > 0 &&
//         <div className="questionWrapSmall">
//         <h1 className='questionSinc'>{surveys[0].title}</h1>
//         <div className='wrapBlockAw'>
//             <div className="pictureAnswerWrap">
//                 <img src={surveys[0].imageURL} className="pictureAnswer"/>
//                             </div>
//                             <div className='questionsWrap'>
                                
//                                 <p className='descriptionQuestion'>
//                                 {surveys[0].description}
//                                 </p>
//                                 {surveys[0].options.map((el, index) => {
//  return <div className='QuestionUl'>
//  <div className='checkQuestion'>  </div> <p className='questionLi'>{el.text}</p>
 
//  </div>
//                                 })}
                             
// <button className='questionButton'>Проголосувати</button>
//                             </div>
//                             </div>
//         </div>
//         }
//      </div>
//     )
// }
const Question = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      const surveysRef = collection(db, 'surveys');
      const surveysSnapshot = await getDocs(surveysRef);
      const surveysData = surveysSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSurveys(surveysData);
      console.log('surveysData', surveysData);
    };

    fetchSurveys();
  }, []);

  const handleOptionClick = (optionIndex) => {
    setSurveys((prevSurveys) => {
      const updatedSurveys = [...prevSurveys];
      const selectedOption = updatedSurveys[0].options[optionIndex];
  
      // Збільшити обране значення на 1
      selectedOption.score += 1;
  
      if (selectedOptionIndex !== null && selectedOptionIndex !== optionIndex) {
        // Зменшити попереднє обране значення на 1
        const prevSelectedOption = updatedSurveys[0].options[selectedOptionIndex];
        prevSelectedOption.score -= 1;
      }
  
      setSelectedOptionIndex(optionIndex);
  
      // Оновити значення в Firebase
      const surveyDocRef = doc(db, 'surveys', updatedSurveys[0].id);
      updateDoc(surveyDocRef, { options: updatedSurveys[0].options })
        .then(() => {
          // Оновлення успішне
        })
        .catch((error) => {
          // Обробка помилки
        });
  
      return updatedSurveys;
    });
  };

  return (
    <div className="questionWrap">
      {surveys.length > 0 && (
        <div className="questionWrapSmall">
          <h1 className="questionSinc">Яка ваша думка?</h1>
          <div className="wrapBlockAw">
            <div className="pictureAnswerWrap">
              <img src={surveys[0].imageURL} className="pictureAnswer" />
            </div>
            <div className="questionsWrap">
              <p className="descriptionQuestion">{surveys[0].description}</p>
              {surveys[0].options.map((option, index) => (
                <div className="QuestionUl" key={index}>
                  <div
                    className={`checkQuestion ${selectedOptionIndex === index ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(index)}
                  ></div>
                  <p className="questionLi">{option.text}</p>
                </div>
              ))}
              <button className="questionButton">Проголосувати</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;