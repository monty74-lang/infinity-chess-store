import { FaChessKnight, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-3"
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

        {/* Desktop Navigation */}

        <ul className="hidden items-center gap-8 text-lg font-medium md:flex">

          <li
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-amber-400"
          >
            Home
          </li>

          <li
            onClick={() => navigate("/openings")}
            className="cursor-pointer hover:text-amber-400"
          >
            Openings
          </li>

          <li
            onClick={() => navigate("/middlegame")}
            className="cursor-pointer hover:text-amber-400"
          >
            Middlegame
          </li>

          <li
            onClick={() => navigate("/endgames")}
            className="cursor-pointer hover:text-amber-400"
          >
            Endgame
          </li>

          {user && (
            <li
              onClick={() => navigate("/my-courses")}
              className="cursor-pointer font-bold text-amber-400 hover:text-amber-300"
            >
              My Courses
            </li>
          )}

        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {user ? (
          <div className="hidden items-center gap-4 md:flex">

            <span className="font-semibold text-white">
              Hello, {user.username}
            </span>

            <button
              onClick={() => navigate("/my-courses")}
              className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-black hover:bg-amber-300"
            >
              My Courses
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-400"
            >
              Logout
            </button>

          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden rounded-xl bg-amber-400 px-7 py-3 font-bold text-black hover:bg-amber-300 md:block"
          >
            Login
          </button>
        )}

      </div>

      {/* Mobile Menu */}

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

            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/my-courses");
                    setMenuOpen(false);
                  }}
                  className="mt-4 rounded-xl bg-amber-400 py-3 font-bold text-black"
                >
                  My Courses
                </button>

                <p className="mt-4 text-center font-bold text-white">
                  Hello, {user.username}
                </p>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-4 rounded-xl bg-red-500 py-3 font-bold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="mt-4 rounded-xl bg-amber-400 py-3 font-bold text-black"
              >
                Login
              </button>
            )}

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;