import pictureQuestion from '../../img/pictureQuestion.png'
import './mainPage.css'



export default function Question() {





    return(
     <div className="questionWrap">
        
        <div className="questionWrapSmall">
        <h1 className='questionSinc'>Яка ваша думка?</h1>
        <div className='wrapBlockAw'>
            <div className="pictureAnswerWrap">
                <img src={pictureQuestion} className="pictureAnswer"/>
                            </div>
                            <div className='questionsWrap'>
                                
                                <p className='descriptionQuestion'>
                                Книга «Булава Іллі Муромця» перенесе вас у добу Київської Русі, коли її головний престол посідав князь Володимир. Щоб захистити свій народ, князь прикликав на допомогу славетних богатирів. Найсильнішим із них був Ілля Муромець. Ілля Муромець образ мужності - віруючий, спокійний, впевнений, знаючий, аскетичний, не жаліє себе, жертовний, дорий, люблячий, захисник, сильний, сміливий, готовий виконувати саму важку роботу, виходити за межі пізнаного.
                                </p>
                                <div className='QuestionUl'>
                                <div className='checkQuestion'>  </div> <p className='questionLi'>Я буду читати дітям про Іллю Муромця.</p>
                                
                                </div>
                                <div className='QuestionUl'>
                                <div className='checkQuestion'>  </div>  <p className='questionLi'>Ні в якому разі, Ілля Муромець сумнівний приклад</p>
                                </div>
                                <div className='QuestionUl'>
                                <div className='checkQuestion'>  </div> <p className='questionLi'>Ні в якому разі, Ілля Муромець архаїчний, треба актуальні герої для сучасних дітей </p>
                                </div>
                                <div className='QuestionUl'>
                                <div className='checkQuestion'>  </div> <p className='questionLi'>В залежності як написано</p>
                                </div>
<button className='questionButton'>Проголосувати</button>
                            </div>
                            </div>
        </div>
     </div>
    )
}