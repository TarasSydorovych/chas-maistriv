import Header from "../standartComponent/header/header";
import Banner from "./banner";
import BookAge from "./bookAge";
import Obcladunka from "./obcladunka";
import PredProdag from "./predProdag";
import './mainPage.css'
import SaleBooks from "./saleBooks";
import ActionPrice from "./actionPrice";
import TopBooks from "./topBooks";
import NewBooks from "./newBooks";
import OpikunRada from "./opikunRada";
import Question from "./question";
import BlockAutor from "./blockAutor";
import AllAutors from "./allAutors";
import MainPageBlog from "./mainPageBlog";
import VideoViewAge from "./videoViewAge";
import Subscribe from "./subscribe";
import Footer from "../standartComponent/footer/footer";
import withFirebaseCollection from "../HOK/withFirebaseCollection";





const MainPage = ({targetDate, windowDimensions, data, scrollHeight}) => {

    if (data.length > 0) {
        
        document.title = data[0].mainTitle; // Встановлюємо заголовок сторінки
  
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data[0].mainDescription); // Встановлюємо опис сторінки
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.setAttribute('name', 'description');
        newMetaDescription.setAttribute('content', data[0].mainDescription);
        document.head.appendChild(newMetaDescription); // Створюємо та вставляємо новий елемент <meta> з описом сторінки
      }
    
      }


    return(
        <div className="allWrapMainPage">
        
        <Banner windowDimensions={windowDimensions} />
        <Obcladunka windowDimensions={windowDimensions} />
        <PredProdag targetDate={targetDate} windowDimensions={windowDimensions}/>
        <NewBooks/>
        <BookAge/>
        <SaleBooks/>
        <ActionPrice/>
        <TopBooks/>
        
        <OpikunRada scrollHeight={scrollHeight}/>
        <Question/>
        <BlockAutor windowDimensions={windowDimensions}/>
        <AllAutors/>
        <MainPageBlog/>
        <VideoViewAge/>
        <Subscribe/>
        <div className="polosa"></div>
        
        </div>
    )
}
export default withFirebaseCollection('seo')(MainPage);