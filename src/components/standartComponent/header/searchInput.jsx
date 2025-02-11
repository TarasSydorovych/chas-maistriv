// import "./header.css";
// import like from "../../../svg/searchLik.svg";
// import { HandySvg } from "handy-svg";
// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductsAll,
//   fetchProductsInSearch,
// } from "../../../function/productsSlice";
// import { useNavigate } from "react-router-dom";

// export default function SearchInput({ closeSearch }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const searchInputRef = useRef(null); // Створення посилання
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = () => {
//     if (searchTerm.trim() === "") {
//       dispatch(fetchProductsAll());
//       navigate("/catalog");
//     } else {
//       dispatch(fetchProductsInSearch(searchTerm));
//       navigate("/catalog");
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//       closeSearch();
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (
//       searchInputRef.current &&
//       !searchInputRef.current.contains(event.target)
//     ) {
//       closeSearch(); // Закриваємо компонент
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="searchInputWrap" ref={searchInputRef}>
//       <input
//         className="searchInput"
//         onChange={(e) => setSearchTerm(e.target.value)}
//         type="text"
//         onKeyDown={handleKeyDown}
//         value={searchTerm}
//       />
//       <HandySvg
//         src={like}
//         width="28"
//         height="22"
//         className="seachDo"
//         onClick={handleSearch}
//       />
//     </div>
//   );
// }
// import "./header.css";
// import like from "../../../svg/searchLik.svg";
// import { HandySvg } from "handy-svg";
// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductsAll,
//   fetchProductsInSearch,
// } from "../../../function/productsSlice";
// import { useNavigate } from "react-router-dom";

// export default function SearchInput({ closeSearch }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const searchInputRef = useRef(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const handleSearch = () => {
//     if (searchTerm.trim() === "") {
//       dispatch(fetchProductsAll());
//       navigate("/catalog");
//     } else {
//       dispatch(fetchProductsInSearch(searchTerm)).then((result) => {
//         setSuggestions(result.payload); // Оновлюємо підказки
//       });
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//       closeSearch();
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (
//       searchInputRef.current &&
//       !searchInputRef.current.contains(event.target)
//     ) {
//       closeSearch(); // Закриваємо компонент
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="searchInputWrap" ref={searchInputRef}>
//       <input
//         className="searchInput"
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           handleSearch();
//         }}
//         type="text"
//         onKeyDown={handleKeyDown}
//         value={searchTerm}
//       />
//       <HandySvg
//         src={like}
//         width="28"
//         height="22"
//         className="seachDo"
//         onClick={handleSearch}
//       />
//       {suggestions.length > 0 && (
//         <ul className="suggestionsList">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 setSearchTerm(suggestion.bookName);
//                 setSuggestions([]); // Закриваємо підказки після вибору
//                 navigate(`/product/${suggestion.id}`);
//                 closeSearch();
//               }}
//             >
//               {suggestion.bookName}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import "./header.css";
import like from "../../../svg/searchLik.svg";
import { HandySvg } from "handy-svg";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAll,
  fetchProductsInSearch,
} from "../../../function/productsSlice";
import { useNavigate } from "react-router-dom";
import transliterate from "../../../function/transliterate";

export default function SearchInput({ closeSearch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = () => {
    if (searchTerm.trim() !== "") {
      dispatch(fetchProductsInSearch(searchTerm)).then((result) => {
        setSuggestions(result.payload); // Оновлюємо підказки
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      dispatch(fetchProductsAll());
    } else {
      dispatch(fetchProductsInSearch(searchTerm)).then((result) => {
        navigate("/catalog", { state: { searchResults: result.payload } });
      });
    }
    closeSearch();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      closeSearch(); // Закриваємо компонент
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [searchTerm]);

  return (
    <div className="searchInputWrap" ref={searchInputRef}>
      <input
        className="searchInput"
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
        value={searchTerm}
      />
      <HandySvg
        src={like}
        width="28"
        height="22"
        className="seachDo"
        onClick={handleSearch}
      />
      {suggestions.length > 0 && (
        <ul className="suggestionsList">
          {suggestions.map((suggestion, index) => (
            <li
              className="liInSearchProduct"
              key={index}
              onClick={() => {
                setSearchTerm(suggestion.bookName);
                setSuggestions([]); // Закриваємо підказки після вибору
                navigate(`/product/${transliterate(suggestion.bookName)}`);
                closeSearch();
              }}
            >
              {suggestion.bookName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
