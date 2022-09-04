import React, { useState } from "react";
//import of all the existing country
import { Country } from "country-state-city";
import Axios from "axios";
import Pagination from "./Pagination";
import "../styles/view.css";
//import of the logo
import gitlogo from "./assets/images/gitlogo.svg";

const View = () => {
  //state for data of all users
  const [data, setData] = useState([]);
  //state used for pagination
  const [numberOfCard] = useState(5);
  const [currentPage, setCurrentPage] = useState([1]);
  //state for the inputsearch to toogle disable statement
  const [isDisabled, setIsDisabled] = useState(true)


  //function used to get all countries
  const countries = Country.getAllCountries();

  //used to store all users from an country
  var dataAfterSearch = [];

  //variable used to configure the pagination
  const indexOfLastCard = currentPage * numberOfCard;
  const indexOfFirstCard = indexOfLastCard - numberOfCard;
  var currentCard = data.slice(indexOfFirstCard, indexOfLastCard);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //function used to get all users from a country
  function filterByCountry(country) {
    // eslint-disable-next-line eqeqeq
    if (country == 0) {
      setData([]);
    } else {
      Axios.get(
        `https://api.github.com/search/users?q=location:${country}&per_page=100`
      ).then((response) => {
        setIsDisabled(false)
        sortedTable(response.data.items);
      });
    }
  }

  // function to sort data by the recent one to the old one
  function sortedTable(dataToSorted) {
    for (let i = 0; i < dataToSorted.length; i++) {
      for (let j = 1; j < dataToSorted.length; j++) {
        if (dataToSorted[i].id > dataToSorted[j].id) {
          [dataToSorted[i], dataToSorted[j]] = [
            dataToSorted[j],
            dataToSorted[i],
          ];
        }
      }
    }
    setData(dataToSorted);
  }

  //live search function by username
  function searchByUsername(inputTextSearch) {
    const textSearchUpper = inputTextSearch.toUpperCase();
    try {
      for (let i = 0; i < data.length; i++) {
        var login = data[i].login;
        if (login.toUpperCase().includes(textSearchUpper)) {
          dataAfterSearch.push(data[i]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setData(dataAfterSearch);
  }

  return (
    <div>
      <div className="header-container">
        <img src={gitlogo} alt="github logo" />
      </div>
      <div className="form-control justify-center ">
        <div className="input-group justify-center">
          <input
            disabled={isDisabled}
            id="inputSearch"
            type="text"
            placeholder="search by username..."
            className="input input-bordered"
            onChange={(e) => {
              searchByUsername(e.target.value);
            }}
          />
          <span className="btn btn-square" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <select
            className="select select-bordered w-full max-w-xs ml-5"
            onChange={(e) => filterByCountry(e.target.value)}
          >
            <option value="0"> Choose the contry</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div id="card-container">
        {currentCard.map((dataUser) => (
          <div className="records flex justify-center items-center" key={dataUser.id}>
            <div className="card card-side bg-base shadow-xl ml-10 mt-5">
              <figure>
                <a href={dataUser.html_url} target="blank">
                  <img src={dataUser.avatar_url} alt="avatar" />
                </a>
              </figure>
              <div className="card-body" >
                <h2 className="card-title">{dataUser.login}</h2>
                <p>
                  <span>
                    <u>id</u> : {dataUser.id}
                  </span>
                  <span>
                    <u>Type</u> : {dataUser.type}
                  </span>
                  <span>
                    <u>score</u> : {dataUser.score}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination justify-center">
        <Pagination
          numberOfCards={numberOfCard}
          totalNumberOfCard={data.length}
          changePage={pagination}
        />
      </div>
    </div>
  );
};

export default View;
