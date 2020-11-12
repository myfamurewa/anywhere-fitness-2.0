import React, { useState, useEffect } from "react";
import axiosWithAuth from "./clients/API/axiosWithAuth";

export default function Reservations(){
    const [Reservation, setReservation] = useState([]);
    const workouts = []
    useEffect(() => {
        axiosWithAuth()
          .get("/api/client/reservations")
          .then(response => {
            console.log("This is the reservation list ", response);
            const data = response.data;
            console.log("These are all the classes", data)
            data.forEach(item => {
                axiosWithAuth()
                .get(`/api/classes/${item.classId}`)
                .then(res => {
                    workouts.push(res)
                    console.log("These are the workouts", workouts)
                 setReservation([...workouts, res])
                 })
                
            })
            
          })
          .catch(error => {
            console.log("Data could not be retrieved", error);
          });
          
      }, []);

          
      console.log("This is the array of Reservations", Reservation)

    return (
        <>
        <h1>Your Reservations</h1>
        <div className="reservations">
        {Reservation.map((workout, index) =>{
            console.log("mapped workout", workout)
           return(
            <div className="reservation">
            <h2>{workout.data.type}</h2>
            <h3>{workout.data.name}</h3>
            <p>{workout.data.startTime}</p>
            </div>
           );
        })}
        </div>
        </>
    )
}