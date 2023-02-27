import React, { useEffect } from "react";
import axios from "axios"
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "components/hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) { //to form component
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
      .then(() => { transition(SHOW) })// app.id
      .catch((error) => {
        transition(ERROR_SAVE, true)
      })
  }

  function remove() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => { transition(EMPTY) })
      .catch((error) => {
        transition(ERROR_DELETE, true)
      })
  }


  return (
    <article className="appointment" data-testid="appointment">
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
      {mode === ERROR_SAVE && <Error message={'could not cancel appointment'} />}
      {mode === ERROR_DELETE && <Error message={'could not cancel appointment'} onClose={() => back(SHOW)} />}

    </article>

  );

}