import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //state
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    spot: 0,
  });
  const setDay = day => setState({ ...state, day });

  //api
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(([days, appointments, interviewers]) => {
      // console.log('days', days)
      // console.log('appointments', appointments)
      console.log('interviewers', interviewers)
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }))
      // setDays([...response.data]) //setState({...state, days: [...response.data]})
    })
  }, [])//only render once

  function updateSpots(appointments, id) {
    const day = state.days.find((selectDay) =>
      selectDay.appointments.includes(id)
    );//checking
    const dayIndex = state.days.findIndex((selectDay) =>
      selectDay.appointments.includes(id)
    );
    console.log("day", day);
    let spots = 0;

    if (!day) {
      return state.days;
    }
    for (const appointmentId of day.appointments) {
      if (appointments[appointmentId].interview === null) {
        spots++;
      }
    }

    let updateDay = {
      ...day,
      spots,
    };

    //console.log('update',updateDay)

    let newDays = [...state.days];
    newDays[dayIndex] = updateDay;
    //console.log("new", newDays);
    return newDays;
  }

  function bookInterview(id, interview) {
    console.log("book", id, interview);

    const appointment = {
      ...state.appointments[id], // apps:{"1": {id: 1, time: "12pm", interview: null}}
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments, // all apps keep here
      [id]: appointment //store new apps into this obj
    };

    const daysSpot = updateSpots(appointments, id);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, daysSpot });

      })

  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments, // all apps keep here
      [id]: appointment //store new apps into this obj
    };

   const daysSpot = updateSpots(appointments, id);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, daysSpot});

      })

  }

  return { state, setDay, bookInterview, cancelInterview };
}