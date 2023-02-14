
export function getAppointmentsForDay(state, day) {
    const { days, appointments } = state
    let result = []
    for (const eachDay of days) {
        if (eachDay.name === day) {
            for (const eachId of eachDay.appointments) {
                result.push(appointments[eachId])
            }
        }
    }
    return result
}

export function getInterview(state, interview) {
    if (!interview) {
        return null
    }
    const interviewersObj = state.interviewers
    const interviewerId = interview.interviewer
    let result = {
        student: interview.student,
        interviewer: interviewersObj[interviewerId]
    }
    return result
}

export function getInterviewersForDay(state, day) {

    const { days, interviewers } = state
    if (!days) {
        return []
    }
    let result = []
    for (const eachDay of days) {
        if (eachDay.name === day) {
            for (const eachId of eachDay.interviewers) {
                result.push(interviewers[eachId])
            }
        }
    }
    console.log(result)
    return result
}