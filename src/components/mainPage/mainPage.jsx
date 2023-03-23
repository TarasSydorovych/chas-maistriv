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





export default function MainPage() {




    return(
        <>
        <Header/>
        <Banner/>
        <Obcladunka/>
        <PredProdag/>
        <BookAge/>
        <SaleBooks/>
        <ActionPrice/>
        <TopBooks/>
        <NewBooks/>
        <OpikunRada/>
        <Question/>
        </>
    )
}