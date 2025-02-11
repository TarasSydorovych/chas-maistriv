// export default function ListButtonCount({ pageNumbers, handlePageClick }) {
//   return (
//     <div className="wrapButtonCountList">
//       {pageNumbers.map((pageNumber) => (
//         <button
//           className="buttonWithCountPage"
//           key={pageNumber}
//           onClick={() => handlePageClick(pageNumber)}
//         >
//           {pageNumber}
//         </button>
//       ))}
//     </div>
//   );
// }
// Додайте відповідний файл стилів

import css from "./listButtonCount.module.css"; // Додайте відповідний файл стилів

export default function ListButtonCount({
  pageNumbers,
  handlePageClick,
  currentPage,
}) {
  return (
    <div className={css.wrapButtonCountList}>
      {pageNumbers.map((pageNumber) => (
        <button
          className={`${css.buttonWithCountPage} ${
            currentPage === pageNumber ? css.activeButton : ""
          }`}
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
}
