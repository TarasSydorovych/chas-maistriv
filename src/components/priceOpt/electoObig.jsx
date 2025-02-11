import css from "./priceOpt.module.css";
import withFirebaseCollection from "../HOK/withFirebaseCollection";

const ElectroObig = ({ data }) => {
  console.log("data2s", data);
  return (
    <>
      {data && data[0] && (
        <div className={css.colorBlockWrap}>
          <div className={css.electro}>
            <a
              href={data[0].electroLink}
              target="_blank"
              rel="noopener noreferrer"
              className={css.electroLink}
            >
              {data[0].electroText}
            </a>
          </div>
          <div className={css.catolog}>
            <a
              href={data[0].catalogLink}
              target="_blank"
              rel="noopener noreferrer"
              className={css.catalogLink}
            >
              {data[0].catalogText}
            </a>
          </div>
          <div className={css.delivery}>{data[0].deliveryText}</div>
          <div className={css.discount}>{data[0].discountText}</div>
        </div>
      )}
    </>
  );
};
export default withFirebaseCollection("pageOpt")(ElectroObig);
