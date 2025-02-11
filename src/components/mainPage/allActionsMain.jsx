import AllRozprodagNew from "./allRozprodagNew";
import css from "./main.module.css";
import OneProdActions from "./oneProdActions";
import TopBooksNew from "./topBooksNew";
const AllActionsMain = ({ setCartCounterC, setLikeCounterC }) => {
  return (
    <div className={css.allActionsWrap}>
      <div className={css.wrapActionsM}>
        <OneProdActions
          setCartCounterC={setCartCounterC}
          setLikeCounterC={setLikeCounterC}
        />
      </div>
      <div className={css.wrapRozprodagM}>
        <AllRozprodagNew
          setCartCounterC={setCartCounterC}
          setLikeCounterC={setLikeCounterC}
        />
      </div>
      <div className={css.wrapTopM}>
        <TopBooksNew
          setCartCounterC={setCartCounterC}
          setLikeCounterC={setLikeCounterC}
        />
      </div>
    </div>
  );
};
export default AllActionsMain;
