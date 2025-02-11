import withFirebaseCollection from "../HOK/withFirebaseCollection";
import css from "./priceOpt.module.css";
import saleThreBlock from "../../img/saleThreBlock.png";
import rotatePic from "../../img/rotatePic.png";
import notRotatePic from "../../img/notRotatePic.png";
import soonPicProd from "../../img/soonPicProd.png";
import saleNewOne from "../../img/saleNewOne.png";
import saleNewTwo from "../../img/saleNewTwo.png";
import { useNavigate } from "react-router-dom";
const ActionsAnd = ({ data }) => {
  const navigete = useNavigate();
  const handleJoinClick = () => {
    if (data[1].joinLink) {
      window.open(data[1].joinLink, "_blank");
    }
  };

  const handleDetailsClick = () => {
    if (data[1].detailsLink) {
      window.open(data[1].detailsLink, "_blank");
    }
  };
  return (
    <>
      {data && data[1] && (
        <div className={css.salesBlockWrap}>
          <div className={css.blueBlockWrap}>
            <h3 className={css.saleForNewYear}>
              Акція до
              <br /> Нового року
            </h3>
            <div className={css.prdeProdPricingCart}>
              <div className={css.prdeProdPricingRotateCart}>
                <p className={css.salePriceCart}>+5</p>
                <p className={css.fullPriceCart}>безкоштовно*</p>
              </div>
            </div>
            <button className={css.buttonJoin} onClick={handleJoinClick}>
              Приєднатися
            </button>
            <img className={css.saleNewOneSt} src={data[1].saleNewOneUrl} />
            <img className={css.saleNewTwoSt} src={data[1].saleNewTwoUrl} />
            <img
              className={css.saleThreBlockSt}
              src={data[1].saleThreBlockUrl}
            />
            <p className={css.vidTwPcs}>*від 20 одиниць</p>
          </div>
          <div className={css.yelowBlockWrap}>
            <h3 className={css.saleForProduction}>
              Розпродаж у зв'язку зі
              <br />
              зняттям з виробництва
            </h3>
            <div className={css.prdeProdPricingCartPr}>
              <div className={css.prdeProdPricingRotateCartPr}>
                <p className={css.salePriceCartPr}>-20%</p>
                <p className={css.fullPriceCartPr}>знижка</p>
              </div>
            </div>
            <button className={css.buttonJoinPr} onClick={handleDetailsClick}>
              Детальніше
            </button>
            <p className={css.vidTwPcsPr}>до 29 вересня</p>
            <img className={css.prodNewOneSt} src={data[1].rotatePicUrl} />
            <img className={css.prodNewTwoSt} src={data[1].notRotatePicUrl} />
          </div>
        </div>
      )}
    </>
  );
};
export default withFirebaseCollection("pageOpt")(ActionsAnd);
