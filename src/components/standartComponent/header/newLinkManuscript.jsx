import {
  fetchProductsAll,
  fetchProducts,
} from "../../../function/manufacturesSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function NewLinkManuscript({ setAllManus }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allBooksCloseMan = () => {
    dispatch(fetchProductsAll());
    setAllManus(false);
    navigate("/manuscriptCatalog");
  };
  return <p onClick={allBooksCloseMan}> Рукописи</p>;
}
