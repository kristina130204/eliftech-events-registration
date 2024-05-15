import axios from "axios";
import { useEffect, useState } from "react";
import Event from "../components/Event";
import { PiCaretDown } from "react-icons/pi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("%22%22");
  const [order, setOrder] = useState("asc");
  const [sortOpen, setSortOpen] = useState(false);

  const eventsLoader = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://eliftech-backend-production.up.railway.app/api/events/?page=${page}&sort=${sortBy}&order=${order}`
      );
      setEvents((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    eventsLoader();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [isLoading]);

  useEffect(() => {
    eventsLoader();
    // eslint-disable-next-line
  }, [sortBy, order]);

  const sortEvents = (property) => {
    setPage(0);
    setEvents([]);
    setSortBy(property);
  };

  const sortHandle = (e) => {
    sortEvents(e.target.value.split(" ")[0]);
    setOrder(e.target.value.split(" ")[1]);
    setSortOpen(false);
  };

  return (
    <div className='container container-events'>
      <h1>Events</h1>
      <div className='sortBy'>
        <span onClick={() => setSortOpen(!sortOpen)}>
          Sort by <PiCaretDown />
        </span>
        <div className={`${!sortOpen ? "hidden" : ""}`}>
          <div>
            <input
              type='radio'
              name='sort'
              value='title asc'
              id='title asc'
              onChange={sortHandle}
            />
            <label htmlFor='title asc'>By title A - Z</label>
          </div>
          <div>
            <input
              type='radio'
              name='sort'
              value='title desc'
              id='title desc'
              onChange={sortHandle}
            />
            <label htmlFor='title desc'>By title Z - A</label>
          </div>
          <div>
            <input
              type='radio'
              name='sort'
              value='organaizer asc'
              id='organizer asc'
              onChange={sortHandle}
            />
            <label htmlFor='organizer asc'>By organizer A - Z</label>
          </div>
          <div>
            <input
              type='radio'
              name='sort'
              value='organaizer desc'
              id='organizer desc'
              onChange={sortHandle}
            />
            <label htmlFor='organizer desc'>By organizer Z - A</label>
          </div>
          <div>
            <input
              type='radio'
              name='sort'
              value='eventDate asc'
              id='eventDate asc'
              onChange={sortHandle}
            />
            <label htmlFor='eventDate asc'>Nearest by date</label>
          </div>
          <div>
            <input
              type='radio'
              name='sort'
              value='eventDate desc'
              id='eventDate desc'
              onChange={sortHandle}
            />
            <label htmlFor='eventDate desc'>More further by date</label>
          </div>
        </div>
      </div>
      <div className='events'>
        {events.map((event, id) => (
          <Event event={event} key={id} />
        ))}
      </div>
    </div>
  );
};

export default Events;
