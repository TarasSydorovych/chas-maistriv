import SmallProductCartSaleWhithout from "../standartComponent/productComponent/smallProductCartSaleWhithout";
import '../standartComponent/productComponent/productStyle.css'



export default function YouLikeIt() {




    return(
       <div className="youLikeItWrap">
        <div className="youLikewrapSmall">
        <h2 className="youLikeItH2">
        Вам сподобається
        </h2>
        <div className="youLikeProductWrap">
            <SmallProductCartSaleWhithout/>
            <SmallProductCartSaleWhithout/>
            <SmallProductCartSaleWhithout/>
            
        </div>
        </div>
       </div>
    )
}