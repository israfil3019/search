import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import Results from "./Results";

const LandingPage = ({ handleSearch, search, setSearch, filterData, error }) => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  return (
    <div className='container'>
      <header>
        <img src={logo} className="logo" alt="logo" />
        <div className="logo__subtitle">
          <p>Search web app</p>
        </div>
      </header>
      <div>
        <input
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className={error ? `search__input error` : `search__input`}
        />
        <button
          onClick={() => {
            setSearch(term)
            handleSearch(term);
          }}
          className="search__button"
        >
          Search
        </button>
        {search && (
          <div className="suggested">
            {filterData?.slice(0, 3)?.map((item, index) => (
              <Results key={index} data={item} />
            ))}
            {filterData?.length > 3 && (
              <div className='show-more'>
                <Link to="/results">
                  Show more...
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;