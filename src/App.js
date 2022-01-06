import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchDetails from "./components/SearchDetails";
import MockData from "./mockData.json";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState("");

  useEffect(() => {
    localStorage.setItem("filterData", JSON.stringify(filterData));
    localStorage.setItem("search", JSON.stringify(search));
    return () => {
      setError(false);
    };
  }, [filterData, search]);

  const handleOrder = (order) => {
    switch (order) {
      case "nameAsc": {
        const newArr = filterData.sort();
        return setFilterData(newArr);
      }
      case "nameDesc": {
        const newArr = filterData.sort().reverse();
        return setFilterData(newArr);
      }
      case "yearAsc": {
        const newArr = filterData
          .map((i) => i)
          .sort((a, b) => b[3].split("/")[2] - a[3].split("/")[2])
          .reverse();
        return setFilterData(newArr);
      }
      case "yearDesc": {
        const newArr = filterData
          .map((i) => i)
          .sort((a, b) => b[3].split("/")[2] - a[3].split("/")[2]);
        return setFilterData(newArr);
      }
      default:
        return { ...filterData };
    }
  };

  const handleSearch = (value) => {
    if (value) {
      setFilterData(
        MockData.data.filter((item) => {
          return (
            item[0].toLowerCase().includes(value.toLowerCase()) ||
            item[4].toLowerCase().includes(value.toLowerCase()) ||
            item[5].toLowerCase().includes(value.toLowerCase())
          );
        })
      );
    } else {
      setError(true);
    }
  console.log('search')

  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              filterData={filterData}
              error={error}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          }
        ></Route>
        <Route
          path="/results"
          element={
            <SearchDetails
              search={search}
              error={error}
              setSearch={setSearch}
              handleSearch={handleSearch}
              filterData={filterData}
              setFilterData={setFilterData}
              setOrder={setOrder}
              order={order}
              handleOrder={handleOrder}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;