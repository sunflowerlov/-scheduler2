import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
    const {interviewers, interviewer, setInterviewer} = props // interviewer = id

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>

            <ul className="interviewers__list">
                {interviewers.map((eachInterviewer) => {
                    return (
                        <InterviewerListItem
                            id = {eachInterviewer.id}
                            name = {eachInterviewer.name}
                            avatar = {eachInterviewer.avatar}
                            selected = {eachInterviewer.id === interviewer}
                            setInterviewer = {setInterviewer}

                        />
                    )
                })}

            </ul>
        </section>

    )
} 