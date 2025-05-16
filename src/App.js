
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLandingPage from './components/MainLandingPage';
import AppointmentPage from './components/AppointmentPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ padding: "24px 40px" }}>
      <BrowserRouter>
        {/* <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/appointment">Appointment</Link>
      </nav> */}
      <Navbar/>
        <Routes>
          <Route path="/" element={<MainLandingPage/>} />
          <Route path="/appointment" element={<AppointmentPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
