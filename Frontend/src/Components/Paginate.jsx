import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

const Paginate = ({ pages, page, isAdmin }) => {
  const getPaginationRange = () => {
    const totalVisiblePages = 5; // Adjust this to control how many page numbers to show
    const range = [];

    if (pages <= totalVisiblePages) {
      for (let i = 1; i <= pages; i++) {
        range.push(i);
      }
    } else {
      const left = Math.max(1, page - 2);
      const right = Math.min(pages, page + 2);

      for (let i = left; i <= right; i++) {
        range.push(i);
      }

      if (left > 2) range.unshift("...");
      if (right < pages - 1) range.push("...");
      if (!range.includes(1)) range.unshift(1);
      if (!range.includes(pages)) range.push(pages);
    }

    return range;
  };

  return (
    <>
      {pages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-5">
          <Link to={page > 1 ? (!isAdmin ? `/page/${page - 1}` : `/admin/productlist/page/${page - 1}`) : "#"} className={` ${page === 1 ? "btn-disabled text-gray-400" : ""}`}>
            <p className="flex items-center gap-2 text-sm">
              <MdArrowBackIosNew /> Previous
            </p>
          </Link>
          <div className="join">
            {getPaginationRange().map((item, index) =>
              item === "..." ? (
                <span key={index} className="btn btn-disabled">
                  ...
                </span>
              ) : (
                <Link key={item} to={!isAdmin ? `/page/${item}` : `/admin/productlist/page/${item}`}>
                  <button className={`join-item btn btn-sm rounded-none  ${item === page ? "btn-active" : ""}`}>{item}</button>
                </Link>
              ),
            )}
          </div>
          <Link to={page < pages ? (!isAdmin ? `/page/${page + 1}` : `/admin/productlist/page/${page + 1}`) : "#"} className={` ${page === pages ? "btn-disabled text-gray-400" : ""}`}>
            <p className="flex items-center gap-2 text-sm">
              Next <MdArrowForwardIos />
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Paginate;
{
  /* <button className="join-item btn btn-sm btn-active">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">4</button> */
}
