




export default function ListButtonCount({pageNumbers, handlePageClick}) {





    return(
        <div className="wrapButtonCountList">
            {pageNumbers.map((pageNumber) => (
        <button className="buttonWithCountPage" key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}

        </div>
    )
}