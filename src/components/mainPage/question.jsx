// import pictureQuestion from "../../img/pictureQuestion.png";
// import "./mainPage.css";
// import { useState, useEffect } from "react";
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { setDoc } from "firebase/firestore";
// import Swal from "sweetalert2";

// const Question = () => {
//   const [surveys, setSurveys] = useState([]);
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [showResults, setShowResults] = useState(false);
//   const [hasVoted, setHasVoted] = useState(false); // Відстежує, чи проголосував користувач

//   useEffect(() => {
//     const fetchSurveys = async () => {
//       const surveysRef = collection(db, "surveys");
//       const surveysSnapshot = await getDocs(surveysRef);
//       const surveysData = surveysSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSurveys(surveysData);

//       // Підрахунок загальної кількості голосів для варіантів, де text не порожній
//       const initialTotalVotes = surveysData[0].options
//         .filter((option) => option.text !== "")
//         .reduce((acc, option) => acc + option.score, 0);
//       setTotalVotes(initialTotalVotes);
//     };

//     fetchSurveys();
//   }, []);

//   const handleOptionClick = (optionIndex) => {
//     setSelectedOptionIndex(optionIndex);
//   };

//   const handleVoteClick = async () => {
//     if (selectedOptionIndex !== null) {
//       setSurveys((prevSurveys) => {
//         const updatedSurveys = [...prevSurveys];
//         const selectedOption = updatedSurveys[0].options[selectedOptionIndex];

//         // Збільшити обране значення на 1
//         selectedOption.score += 1;

//         // Оновити значення в Firebase
//         const surveyDocRef = doc(db, "surveys", updatedSurveys[0].id);
//         updateDoc(surveyDocRef, { options: updatedSurveys[0].options })
//           .then(() => {
//             Swal.fire({
//               title: "Дякуємо за ваш голос!",
//               text: "Ваша думка важлива для нас.",
//               icon: "success",
//               confirmButtonText: "OK",
//               confirmButtonColor: "#609966",
//             });
//             setHasVoted(true); // Встановлюємо, що користувач проголосував
//           })
//           .catch((error) => {
//             console.error("Error updating document: ", error);
//             Swal.fire({
//               title: "Помилка!",
//               text: "Сталася помилка під час голосування. Спробуйте ще раз.",
//               icon: "error",
//               confirmButtonText: "OK",
//               confirmButtonColor: "#d33",
//             });
//           });

//         // Оновлення загальної кількості голосів з урахуванням тільки варіантів з текстом
//         const newTotalVotes = totalVotes + 1;
//         setTotalVotes(newTotalVotes);
//         setShowResults(true);

//         return updatedSurveys;
//       });
//     } else {
//       Swal.fire({
//         title: "Помилка!",
//         text: "Будь ласка, виберіть один з варіантів для голосування.",
//         icon: "error",
//         confirmButtonText: "OK",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <div className="questionWrap">
//       {surveys.length > 0 && (
//         <div className="questionWrapSmall">
//           <h1 className="questionSinc">Яка ваша думка?</h1>
//           <div className="wrapBlockAw">
//             <div className="pictureAnswerWrap">
//               <img
//                 src={surveys[0].imageURL}
//                 className="pictureAnswer"
//                 alt={`${surveys[0].bookName}`}
//               />
//             </div>
//             <div className="questionsWrap">
//               <p className="descriptionQuestion">{surveys[0].description}</p>
//               {surveys[0].options
//                 .filter((option) => option.text !== "")
//                 .map((option, index) => {
//                   const percentage = totalVotes
//                     ? ((option.score / totalVotes) * 100).toFixed(1)
//                     : 0;
//                   return (
//                     <div className="QuestionUl" key={index}>
//                       <div
//                         className={`checkQuestion ${
//                           selectedOptionIndex === index
//                             ? hasVoted
//                               ? "greenButtonCheck"
//                               : "selected"
//                             : ""
//                         }`}
//                         onClick={() => handleOptionClick(index)}
//                       ></div>
//                       {showResults && (
//                         <span className="percentage">{percentage}%</span>
//                       )}
//                       <p className="questionLi">{option.text}</p>
//                     </div>
//                   );
//                 })}
//               {!hasVoted && ( // Відображати кнопку тільки якщо користувач ще не проголосував
//                 <button className="questionButton" onClick={handleVoteClick}>
//                   Проголосувати
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Question;
import pictureQuestion from "../../img/pictureQuestion.png";
import "./mainPage.css";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";

const Question = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchLatestSurvey = async () => {
      try {
        // Отримання найновішого опитування
        const surveysRef = collection(db, "surveys");
        const latestSurveyQuery = query(
          surveysRef,
          orderBy("data", "desc"),
          limit(1)
        );
        const surveySnapshot = await getDocs(latestSurveyQuery);

        if (!surveySnapshot.empty) {
          const latestSurvey = surveySnapshot.docs[0].data();
          setSurveys([{ id: surveySnapshot.docs[0].id, ...latestSurvey }]);

          // Підрахунок загальної кількості голосів
          const initialTotalVotes = latestSurvey.options
            .filter((option) => option.text !== "")
            .reduce((acc, option) => acc + option.score, 0);
          setTotalVotes(initialTotalVotes);
        }
      } catch (error) {
        console.error("Помилка під час отримання опитування: ", error);
      }
    };

    fetchLatestSurvey();
  }, []);

  const handleOptionClick = (optionIndex) => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleVoteClick = async () => {
    if (selectedOptionIndex !== null) {
      setSurveys((prevSurveys) => {
        const updatedSurveys = [...prevSurveys];
        const selectedOption = updatedSurveys[0].options[selectedOptionIndex];

        // Збільшити обране значення на 1
        selectedOption.score += 1;

        // Оновити значення в Firebase
        const surveyDocRef = doc(db, "surveys", updatedSurveys[0].id);
        updateDoc(surveyDocRef, { options: updatedSurveys[0].options })
          .then(() => {
            Swal.fire({
              title: "Дякуємо за ваш голос!",
              text: "Ваша думка важлива для нас.",
              icon: "success",
              confirmButtonText: "ОК",
              confirmButtonColor: "#609966",
            });
            setHasVoted(true);
          })
          .catch((error) => {
            console.error("Помилка під час оновлення документа: ", error);
            Swal.fire({
              title: "Помилка!",
              text: "Сталася помилка під час голосування. Спробуйте ще раз.",
              icon: "error",
              confirmButtonText: "ОК",
              confirmButtonColor: "#d33",
            });
          });

        // Оновлення загальної кількості голосів
        const newTotalVotes = totalVotes + 1;
        setTotalVotes(newTotalVotes);
        setShowResults(true);

        return updatedSurveys;
      });
    } else {
      Swal.fire({
        title: "Помилка!",
        text: "Будь ласка, виберіть один із варіантів для голосування.",
        icon: "error",
        confirmButtonText: "ОК",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="questionWrap">
      {surveys.length > 0 && (
        <div className="questionWrapSmall">
          <h1 className="questionSinc">Яка ваша думка?</h1>
          <div className="wrapBlockAw">
            <div className="pictureAnswerWrap">
              <img
                src={surveys[0].imageURL || pictureQuestion}
                className="pictureAnswer"
                alt={surveys[0].title}
              />
            </div>
            <div className="questionsWrap">
              <p className="descriptionQuestion">{surveys[0].description}</p>
              {surveys[0].options
                .filter((option) => option.text !== "")
                .map((option, index) => {
                  const percentage = totalVotes
                    ? ((option.score / totalVotes) * 100).toFixed(1)
                    : 0;
                  return (
                    <div className="QuestionUl" key={index}>
                      <div
                        className={`checkQuestion ${
                          selectedOptionIndex === index
                            ? hasVoted
                              ? "greenButtonCheck"
                              : "selected"
                            : ""
                        }`}
                        onClick={() => handleOptionClick(index)}
                      ></div>
                      {showResults && (
                        <span className="percentage">{percentage}%</span>
                      )}
                      <p className="questionLi">{option.text}</p>
                    </div>
                  );
                })}
              {!hasVoted && (
                <button className="questionButton" onClick={handleVoteClick}>
                  Проголосувати
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
