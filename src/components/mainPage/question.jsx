import pictureQuestion from '../../img/pictureQuestion.png'
import './mainPage.css'



export default function Question() {





    return(
     <div className="questionWrap">
        <div className="questionWrapSmall">

            <div className="pictureAnswerWrap">
                <img src={pictureQuestion} className="pictureAnswer"/>
                            </div>
                            <div className='questionsWrap'>
                                <h1 className='questionSinc'>Яка ваша думка?</h1>
                                <p className='descriptionQuestion'>
                                Книга «Булава Іллі Муромця» перенесе вас у добу Київської Русі, коли її головний престол посідав князь Володимир. Щоб захистити свій народ, князь прикликав на допомогу славетних богатирів. Найсильнішим із них був Ілля Муромець. Ілля Муромець образ мужності - віруючий, спокійний, впевнений, знаючий, аскетичний, не жаліє себе, жертовний, дорий, люблячий, захисник, сильний, сміливий, готовий виконувати саму важку роботу, виходити за межі пізнаного.
                                </p>
                                <ul className='QuestionUl'>
                                    <li className='questionLi'><div className='checkQuestion'></div>Я буду читати дітям про Іллю Муромця.</li>
                                    <li className='questionLi'><div className='checkQuestion'></div>Ні в якому разі, Ілля Муромець сумнівний приклад</li>
                                    <li className='questionLi'><div className='checkQuestion'></div>Ні в якому разі, Ілля Муромець архаїчний, треба актуальні герої для сучасних дітей </li>
                                    <li className='questionLi'><div className='checkQuestion'></div>В залежності як написано</li>
                                </ul>
                            </div>
        </div>
     </div>
    )
}