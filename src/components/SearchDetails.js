import React, { useEffect } from "react";
import Results from "./Results";
import Logo from "../logo.png";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";


const SearchDetails = ({
  search,
  setSearch,
  filterData,
  setFilterData,
  handleSearch,
  order,
  setOrder,
  error,
  handleOrder,
}) => {
  useEffect(() => {
    setFilterData(JSON.parse(localStorage.getItem("filterData")));
    setSearch(JSON.parse(localStorage.getItem("search")));
    return () => {
      setSearch("");
      setFilterData("");
    };
  }, [setSearch, setFilterData]);

  return (
    <div>
      <div className="result__header">
<Link to='/'>

        <img src={Logo} className="result__header-logo" alt="logo"/>
</Link>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className={
            error
              ? ` search__input search__input-result error`
              : `search__input search__input-result`
          }
        />
        <button onClick={() => handleSearch(search)} className="search__button">
          Search
        </button>
      </div>
      {filterData?.length > 0 && (
        <div className="result__order">
          <select
            onChange={(e) => {
              setOrder(e.target.value);
              handleOrder(e.target.value);
            }}
            value={order}
          >
            <option value="" selected disabled>Order By</option>
            <option value="nameAsc">Name ascending</option>
            <option value="nameDesc">Name descending</option>
            <option value="yearAsc">Year ascending</option>
            <option value="yearDesc">Year descending</option>
          </select>
        </div>
      )}
      <div className="result__container">
        {filterData.length > 0 ? (
          <div>
            <Pagination
              data={filterData}
              RenderComponent={Results}
              dataLimit={10}
            />
          </div>
        ) : (
          <h1>Not found</h1>
        )}
      </div>
    </div>
  );
};

export default SearchDetails;
