import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
    const { student, interviewer, onEdit, onDelete } = props
    return (
        <main className="appointment__card appointment__card--confirm">
            <h1 className="text--semi-bold">Delete the appointment?</h1>
            <section className="appointment__actions">
                <Button danger onClick={onEdit}>Cancel</Button>
                <Button danger onClick={onDelete}>Confirm</Button>
            </section>
        </main>

    );

}