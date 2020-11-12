import React, { useState, useEffect } from "react";
import Select from "react-select";
import axiosWithAuth from "./clients/API/axiosWithAuth";
import ClassCards from "./ClassCards";
import styled from "styled-components";
import Reservations from "./Reservations";
import {Link} from "react-router-dom"
import Map from "./Map"


const styles = {
  fontSize: 14,
  color: '#FFaa99',
}

const classTypes = [
  { label: "Yoga", value: 1 },
  { label: "Weightlifting", value: 2 },
  { label: "Biking/Spin", value: 3 },
  { label: "Functional Fitness", value: 4 },
  { label: "Boxing", value: 5 },
  { label: "Cardio", value: 6 },
  { label: "stretch", value: 7 },
  { label: "Dance", value: 8 },
  { label: "Stretch", value: 9 },
  { label: "Running", value: 10 },
  { label: "Boot camp", value: 11 }
];

const ClassDuration = [
  { label: "0-15 min", value: 1 },
  { label: "15-30 min", value: 2 },
  { label: "30-45 min", value: 3 },
  { label: "45-60 min", value: 4 },
  { label: "60+ min", value: 5 }
];

const ClassTime = [
  { label: "Early Morning", value: 1 },
  { label: "Late Morning", value: 2 },
  { label: "Midday", value: 3 },
  { label: "Early Afternoon", value: 4 },
  { label: "late Afternoon", value: 5 },
  { label: "Early Evening", value: 6 },
  { label: "Late Evening", value: 7 }
];

const ClassLevel = [
  { label: "Beginner", value: 1 },
  { label: "Intermediate", value: 2 },
  { label: "Advanced", value: 3 }
];

const Listed = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
`;
const ListedI = styled.li`
  margin:  4%;
  font-weight: bold;
  font-size: .8rem;

`;

function Home() {
  const [Classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    axiosWithAuth()
      .get("/api/client/profile")
      .then(response => {
        console.log("User Information", response);
        console.log("User name", response.data.firstName);
        setFirstName(response.data.firstName);
      })
      .catch(error => {
        console.log("Unable to retrieve data", error);
      });
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/classes")
      .then(response => {
        console.log("This is the class list", response);
        const data = response.data;
        const result = data.filter(classes =>
          classes.name.toLowerCase().includes(search.toLowerCase())
        );
        console.log(result);
        setClasses(result);
      })
      .catch(error => {
        console.log("Data could not be retrieved", error);
      });
  }, [search]);

  const handleInputChange = event => {
    setSearch(event.target.value);
  };

  return (
    <>
      <section className="header">
        <h1>Anywhere Fitness</h1>
        <form>
          <input
            type="text"
            onChange={handleInputChange}
            value={search}
            name="name"
            tabIndex="0"
            className="search-bar"
            placeholder="Search for a class"
            autoComplete="on"
          />
        </form>
        <Listed>
          <ListedI>About</ListedI>
          <ListedI>Welcome, {firstName}!</ListedI>
          <ListedI><Link to={`/`}>Log Out</Link></ListedI>

        </Listed>
      </section>
      <div className="select-bar">
        <Select type="checkbox" classNamePrefix="react-select" options={classTypes} isMulti />
        <Select  classNamePrefix="react-select" options={ClassDuration} isMulti />
        <Select classNamePrefix="react-select" options={ClassTime} isMulti />
        <Select classNamePrefix="react-select" options={ClassLevel} isMulti />
      </div>
      <div className="container">
        <div className="class-list">
          {Classes.map((clas, index) => {
            return (
              <ClassCards
                classes={Classes}
                setClasses={setClasses}
                key={index}
                clas={clas}
              
              />
            );
          })}
        </div>
          <Map />
        </div>
        <Reservations/>
    </>
  );
}

export default Home;