import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import OpeningPage from "./pages/OpeningPage";
import MiddlegamePage from "./pages/MiddlegamePage";
import EndgamePage from "./pages/EndgamePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetails from "./pages/CourseDetails";
import TelegramButton from "./components/TelegramButton";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./pages/MyCourses";
import WatchCourse from "./pages/WatchCourse";

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
  <Route path="/my-courses" element={<MyCourses />} />
  <Route path="/watch-course/:id" element={<WatchCourse />} />
  <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  }
/>
</Routes>

      <TelegramButton />
    </>
  );
}

export default App;