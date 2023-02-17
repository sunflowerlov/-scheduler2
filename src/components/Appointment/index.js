import React, { useEffect } from "react";
import axios from "axios"
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "components/hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) { //to form component
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    //console.log(interview)
    bookInterview(id, interview).then(() => transition(SHOW))// app.id

  }

  function remove() {
    transition(DELETING)
    cancelInterview(id).then(() => transition(EMPTY))
  }


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM &&
        <Confirm
          onDelete={remove}
          onEdit={() => transition(SHOW)}
        />}
      {mode === EDIT &&
        <Form
          student={interview.student}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />}

    </article>

  );

}