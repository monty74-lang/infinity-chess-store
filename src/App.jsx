import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OpeningPage from "./pages/OpeningPage";
import MiddlegamePage from "./pages/MiddlegamePage";
import EndgamePage from "./pages/EndgamePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetails from "./pages/CourseDetails";
import TelegramButton from "./components/TelegramButton";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/openings" element={<OpeningPage />} />
        <Route path="/middlegame" element={<MiddlegamePage />} />
        <Route path="/endgames" element={<EndgamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>

      <TelegramButton />
    </>
  );
}

export default App;