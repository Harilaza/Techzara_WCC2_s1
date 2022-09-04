import React, { useState } from "react";
import "../styles/view.css";

function Pagination(props) {
  const [placeNumber, setPlaceNumber] = useState(0);
  const [pageHidden, setPageHidden] = useState("none")
  const pageNumber = [];
  for (
    let index = 1;
    index <= Math.ceil(props.totalNumberOfCard / props.numberOfCards);
    index++
  ) {
    pageNumber.push(index);
  }
  return (
    <div>
      <nav>
        <ul style={{display:pageHidden}}>
          <li>{placeNumber}</li>
        </ul>
        <ul className="pagination">
          {pageNumber.map((num) => (
            <li
              key={num}
              onClick={() => {
                props.changePage(num);
                setPlaceNumber(num);
                setPageHidden('')
              }}
              className="ml-5 mt-10 w-5"
            >
              <a href="!#" className="page-link">
                {num}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
