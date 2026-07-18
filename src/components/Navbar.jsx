import { FaChessKnight, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div
  onClick={() => navigate("/")}
  className="flex items-center gap-3 cursor-pointer"
>
          <FaChessKnight className="text-3xl text-amber-400" />
          <div>
  <h1 className="text-xl font-extrabold tracking-wide text-white sm:text-2xl">
    Infinity Chess Store
  </h1>

  <p className="text-sm text-slate-400">
    Premium Chess Courses
  </p>
</div>
        </div>

        <ul className="hidden items-center gap-8 text-lg font-medium md:flex">
  <li
    onClick={() => navigate("/")}
    className="cursor-pointer transition duration-300 hover:text-amber-400"
  >
    Home
  </li>

  <li
    onClick={() => navigate("/openings")}
    className="cursor-pointer transition duration-300 hover:text-amber-400"
  >
    Openings
  </li>

  <li
    onClick={() => navigate("/middlegame")}
    className="cursor-pointer transition duration-300 hover:text-amber-400"
  >
    Middlegame
  </li>

  <li
    onClick={() => navigate("/endgames")}
    className="cursor-pointer transition duration-300 hover:text-amber-400"
  >
    Endgame
  </li>
</ul>

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-2xl md:hidden"
>
  {menuOpen ? <FaTimes /> : <FaBars />}
</button>

        <button
  onClick={() => navigate("/login")}
  className="hidden rounded-xl bg-amber-400 px-7 py-3 font-bold text-black shadow-lg transition duration-300 hover:scale-105 hover:shadow-amber-400/40 md:block"
>
  Login
</button>
      </div>
      {menuOpen && (
  <div className="border-t border-slate-800 bg-slate-900 md:hidden">
    <div className="flex flex-col p-5">

      <button
        onClick={() => {
          navigate("/");
          setMenuOpen(false);
        }}
        className="py-3 text-left hover:text-amber-400"
      >
        Home
      </button>

      <button
        onClick={() => {
          navigate("/openings");
          setMenuOpen(false);
        }}
        className="py-3 text-left hover:text-amber-400"
      >
        Openings
      </button>

      <button
        onClick={() => {
          navigate("/middlegame");
          setMenuOpen(false);
        }}
        className="py-3 text-left hover:text-amber-400"
      >
        Middlegame
      </button>

      <button
        onClick={() => {
          navigate("/endgames");
          setMenuOpen(false);
        }}
        className="py-3 text-left hover:text-amber-400"
      >
        Endgame
      </button>

      <button
        onClick={() => {
          navigate("/login");
          setMenuOpen(false);
        }}
        className="mt-4 rounded-xl bg-amber-400 py-3 font-bold text-black"
      >
        Login
      </button>

    </div>
  </div>
)}
    </nav>
  );
}

export default Navbar;