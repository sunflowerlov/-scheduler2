import React, { useState, useEffect } from "react";
import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment/index";
import useApplicationData from "./hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
