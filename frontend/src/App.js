import { BrowserRouter, Route, Routes } from "react-router-dom";
import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import EventParticipants from "./pages/EventParticipants";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Events />} />
          <Route path='/event/:id' element={<EventParticipants />} />
          <Route path='/event/:id/register' element={<EventRegistration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
