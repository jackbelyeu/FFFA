// EditableTimeCell.client.js
"use client";
import React, { useState, useEffect, useRef } from 'react';

const EditableTimeCell = ({ match }) => {
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [time, setTime] = useState(match.time);
  const [date, setDate] = useState(match.date);
  const timeRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    if (isEditingTime) {
      timeRef.current?.focus();
    }
    if (isEditingDate) {
      dateRef.current?.focus();
    }
  }, [isEditingTime, isEditingDate]);

  const handleTimeBlur = () => {
    setIsEditingTime(false);
    console.log(`New time: ${time}`);
    localStorage.setItem(`matchTime-${match.homeTeam}-${match.awayTeam}`, time);
    // onUpdate({ ...match, time }); // Assuming onUpdate is a prop function to handle the update
  };

  const handleDateBlur = () => {
    setIsEditingDate(false);
    console.log(`New date: ${date}`);
    localStorage.setItem(`matchDate-${match.homeTeam}-${match.awayTeam}`, date);
    // onUpdate({ ...match, date }); // Assuming onUpdate is a prop function to handle the update
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };


  const handleTimeClick = () => {
    setIsEditingTime(true);
  };

  const handleDateClick = () => {
    setIsEditingDate(true);
  };

  return (
    <div>
      {isEditingDate ? (
        <input
          ref={dateRef}
          type="date"
          value={date}
          onChange={handleDateChange}
          onBlur={handleDateBlur}
        />
      ) : (
        <span onClick={handleDateClick}>
          {date}
        </span>
      )}
      <br />
      {isEditingTime ? (
        <input
          ref={timeRef}
          type="time"
          value={time}
          onChange={handleTimeChange}
          onBlur={handleTimeBlur}
        />
      ) : (
        <span onClick={handleTimeClick}>
          {time}
        </span>
      )}
    </div>
  );
};

export default EditableTimeCell;
