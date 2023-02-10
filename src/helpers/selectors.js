
export function getAppointmentsForDay(state, day) {
    const {days, appointments} = state
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
