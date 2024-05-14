import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Participant from "../components/Participant";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { month } from "../helper/month";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const EventParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [title, setTitle] = useState("");
  const params = useParams();
  const id = params.id;
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const participantsLoader = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/events/${id}`
      );
      setDataFromServer(data.participants);
      setParticipants(data.participants);
      setTitle(data.title);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getParticipantsPerDay = () => {
    const participantsPerDay = [];
    dataFromServer.forEach((p) => {
      const newDate = new Date(p.registeredAt);
      participantsPerDay.push(
        `${newDate.getDate()} ${month[newDate.getMonth()]}`
      );
    });
    return participantsPerDay;
  };

  const getDataForChart = () => {
    const p = getParticipantsPerDay();
    let counts = {};
    p.forEach((value) => {
      if (!counts[value]) {
        counts[value] = 1;
      } else {
        counts[value]++;
      }
    });
    return counts;
  };

  useEffect(() => {
    participantsLoader();
  }, []);

  const searchParticipants = (searchedText) => {
    searchedText = searchedText.toLowerCase();
    const searchedParticipants = dataFromServer.filter(
      (p) =>
        p.fullName.toLowerCase().includes(searchedText) ||
        p.email.toLowerCase().includes(searchedText)
    );
    if (searchedText.length < 2) {
      setParticipants(dataFromServer);
    }
    setParticipants(searchedParticipants);
  };

  return (
    <div className='container container-participants'>
      <Link className='go-back' to='/'>
        Go back to events
      </Link>
      <h1>"{title}" participants</h1>
      <input
        className='search'
        type='text'
        placeholder='Search by full name or email...'
        onChange={(e) => searchParticipants(e.target.value)}
      />
      {participants.length > 0 ? (
        <div className='participants'>
          {participants.map((p, id) => (
            <Participant data={p} key={id} />
          ))}
        </div>
      ) : (
        <h2>No one registered yet.</h2>
      )}
      <h2>Registrations per day</h2>
      <Chart
        type='bar'
        options={options}
        data={{
          labels: Object.keys(getDataForChart()),
          datasets: [
            {
              type: "line",
              label: "Registered participants",
              borderColor: "#6bafa3",
              borderWidth: 3,
              fill: true,
              backgroundColor: "#def3ef",
              data: getDataForChart(),
            },
          ],
        }}
      />
    </div>
  );
};

export default EventParticipants;
