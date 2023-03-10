import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props // interviewer = id


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>

      <ul className="interviewers__list">
        {interviewers.map((eachInterviewer) => {
          return (
            <InterviewerListItem
              id={eachInterviewer.id}
              key={eachInterviewer.id}
              name={eachInterviewer.name}
              avatar={eachInterviewer.avatar}
              selected={eachInterviewer.id === value}
              setInterviewer={() => onChange(eachInterviewer.id)}

            />
          )
        })}

      </ul>
    </section>

  )
} 