
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLandingPage from './components/patient/MainLandingPage';
import AppointmentPage from './components/appointment/AppointmentPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ padding: "24px 40px" }}>
      <BrowserRouter>
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
