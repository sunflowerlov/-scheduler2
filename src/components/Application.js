import React, { useState, useEffect } from "react";
import axios from "axios"
import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  //state
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);


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
  }, [])

  function bookInterview(id, interview) {
    console.log("book",id, interview);

    const appointment = {
      ...state.appointments[id], // apps:{"1": {id: 1, time: "12pm", interview: null}}
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments, // all apps keep here
      [id]: appointment //store new apps into this obj
    };

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(()=> {
      setState({...state, appointments});

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

    return axios.delete(`/api/appointments/${id}`)
    .then(()=> {
      setState({...state, appointments});

    })

  }


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          console.log("app", appointment)
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day)
          // console.log("interviewer~", interviewers)
          return (
            <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
