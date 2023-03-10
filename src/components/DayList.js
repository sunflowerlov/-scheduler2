import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props //days is array, day is "monday" === days.name

  return (
    <ul>
      {days.map((dayItem) => {
        return (
          <DayListItem 
            key={dayItem.id}
            name={dayItem.name} //"monday"
            spots={dayItem.spots}
            selected={dayItem.name === value}
            setDay={onChange}
          />)

      })}
    </ul>
  )
}
