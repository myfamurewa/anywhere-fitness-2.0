import React, { useState, useEffect } from "react";
import axiosWithAuth from "./clients/API/axiosWithAuth";
import Modal from "./Modal";
import useModal from "./useModal";
import Carousel from "react-elastic-carousel";
export default function Reservations() {
  const [Reservation, setReservation] = useState([]);
  const workouts = [];
  const {isShowing, toggle} = useModal();
  useEffect(() => {
    axiosWithAuth()
      .get("/api/client/reservations")
      .then((response) => {
        console.log("This is the reservation list ", response);
        const data = response.data;
        console.log("These are all the classes", data);
        data.forEach((item) => {
          axiosWithAuth()
            .get(`/api/classes/${item.classId}`)
            .then((res) => {
              workouts.push(res);
              setReservation([...workouts, res]);
            });
        });
      })
      .catch((error) => {
        console.log("Data could not be retrieved", error);
      });
  }, []);


  return (
    <>
      <h1>Your Reservations</h1>
      <div>
        {" "}
        <button className="button-default" onClick={toggle}>
          Show Modal
        </button>
        <Modal isShowing={isShowing} hide={toggle} />
      </div>
      {/* <div className="reservations"> */}
      <Carousel itemsToShow={1}>
        {Reservation.map((workout, index) => {
          return (
            <div key={index} className="reservation">
              <div className="circle">
                <h2>{workout.data.type}</h2>
              </div>
              <div className="content">
                <h3>{workout.data.name}</h3>
                {workout.data.days.map((day) => {
                  return (
                    <span>
                      {day}s at {workout.data.startTime}pm
                    </span>
                  );
                })}
                <br></br>
                <br></br>
              </div>
            </div>
          );
        })}
      </Carousel>
      {/* </div> */}
    </>
  );
}
