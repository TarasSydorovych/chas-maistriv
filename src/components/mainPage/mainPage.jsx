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






export default function MainPage({targetDate, windowDimensions}) {




    return(
        <div className="allWrapMainPage">
        
        <Banner windowDimensions={windowDimensions} />
        <Obcladunka windowDimensions={windowDimensions} />
        <PredProdag targetDate={targetDate} windowDimensions={windowDimensions}/>
        <BookAge/>
        <SaleBooks/>
        <ActionPrice/>
        <TopBooks/>
        <NewBooks/>
        <OpikunRada/>
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