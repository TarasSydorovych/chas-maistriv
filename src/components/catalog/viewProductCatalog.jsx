import ProductNewReview from "../standartComponent/productComponent/productNewReview";





export default function ViewProductCatalog() {




    return(
        <div className="youLikeItWrapNew">
        <div className="youLikewrapSmall">
        <h2 className="ProductCatalogH2">
        Ви нещодавно переглядали
        </h2>
        <div className="youLikeProductWrap">
            <ProductNewReview/>
            <ProductNewReview/>
            <ProductNewReview/>
            
            
        </div>
        </div>
       </div>
    )
}