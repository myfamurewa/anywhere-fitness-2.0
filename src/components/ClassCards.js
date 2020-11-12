import React, { useState } from "react";
import styled from "styled-components";
import axiosWithAuth from "./clients/API/axiosWithAuth";
import mountainyoga from "./clients/img/mountainyoga.jpg"
import boxer from "./clients/img/boxing.jpg"


export default function ClassCards(props) {

  const Location = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 8px;
  color: #333333;
  `

  const Workout = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 12px;
  letter-spacing: 0.05em;
  color: #1B1A1A;
  `

  const Category = styled.h2`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.05em;
  margin-top: 7%;
  color: #828282
  `
  const Clas = styled.div`
    width: 80%;
    display: flex;
    height: 150px;
    background-color: light gray;
    background: white;
    box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    margin: 1.5rem auto;
    opacity: 0.9;
    justify-content: space-evenly;
  `;
  const Description = styled.div`
    border-left: .5px solid #bdbdbd;
    padding: .5%;
  `;
  const Editbtn = styled.button`
    width: 195px;
    height: 22px;
    color: #1b1a1a;
    background-color: white;
    border: .5px solid #1b1a1a;
    border-radius: 5px;
    font-family: raleway;
    font-weight: bold;
    padding: 0 4%;
    margin: .5%;
  `;
  const Deletebtn = styled.button`
    width: 195px;
    height: 22px;
    color: #1b1a1a;
    background-color: #FF9233;
    border: none;
    border-radius: 4px;
    font-family: raleway;
    font-weight: bold;
    padding: 0 4%;
  `;
const photos = {
  "boxing": boxer,
  "yoga": mountainyoga,
}
const [editing, setEditing] = useState(false);
const [classToEdit, setClassToEdit] = useState();

const {setClasses, classes, clas}= props;
  const deleteReservation = classDelete => {
    // make a delete request to delete this reservation
    axiosWithAuth()
      .delete(`/api/client/reservation/${classDelete._id}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error, "failed to delete");
      });
    setClasses(classes.filter(clas => clas._id !== classDelete._id));
    setEditing(false);
  };

const Reservaton = event => {
    event.preventDefault();
    axiosWithAuth()
    .post(`/api/client/reservation/${clas._id}`, clas,)
    .then(res => {
        console.log(res)
        console.log(res.data)
    })
}



  return (
    <Clas>
      <div className="class-img-container">
       <img  className="class-img" src={mountainyoga} alt="workout"></img> :
      </div>
      <div className="category-container">
      <Category> {clas.type}</Category>
      <Workout>{clas.name}</Workout>
      <Location>location: {clas.location}</Location>
      </div>
      <Description>
        <p>{clas.description}</p>
      <Editbtn onClick={Reservaton}>Reserve</Editbtn>
      <Deletebtn onClick={()=>deleteReservation(clas)}>Delete Reservation</Deletebtn>
      </Description>
    </Clas>
  );
}