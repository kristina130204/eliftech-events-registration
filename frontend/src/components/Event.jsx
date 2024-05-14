import React from "react";
import { Link } from "react-router-dom";
import { PiUserThin } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { month } from "../helper/month";

const Event = ({ event }) => {
  const date = new Date(event.eventDate);

  return (
    <div className='block'>
      <h2>
        <Link to={`/event/${event._id}`}>{event.title}</Link>
      </h2>
      <div className='info'>
        <div className='organizer'>
          <PiUserThin size={20} /> {event.organaizer}
        </div>
        <div className='date'>
          <CiCalendarDate size={20} /> {month[date.getMonth()]} {date.getDate()}{" "}
          {date.getFullYear()}
        </div>
      </div>
      <h3>{event.description}</h3>
      <div className='actions'>
        <Link className='btn primary' to={`/event/${event._id}/register`}>
          Register
        </Link>
        <Link className='btn secondary' to={`/event/${event._id}`}>
          View
        </Link>
      </div>
    </div>
  );
};

export default Event;
