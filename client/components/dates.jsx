import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function Dates() {
  const [date, setDate] = useState(new Date());
  console.log(date);
  return (
    <>
      <Calendar onChange={setDate} value={date} />
    </>
  );
}
