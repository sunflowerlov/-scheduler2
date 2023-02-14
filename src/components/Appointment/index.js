import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "components/hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
export default function Appointment(props) {
    const { time, interview, interviewers } = props
    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
    );

    return (
        <article className="appointment">
            <Header time={time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
            {mode === CREATE && (
                <Form 
                    interviewers={interviewers}
                    onSave={[]}
                    onCancel={() => back(EMPTY)}
                />
            )}

        </article>

    );

}