import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://infinity-chess-store-backend.onrender.com/api/purchase/my-courses/${user.id}`
        );

        const data = await response.json();

        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold text-amber-400">
          My Courses
        </h1>

        <p className="mt-4 text-slate-400">
          Your purchased chess courses.
        </p>

        {loading ? (
          <h2 className="mt-10 text-2xl">Loading...</h2>
        ) : courses.length === 0 ? (
          <h2 className="mt-10 text-2xl text-slate-400">
            You haven't purchased any courses yet.
          </h2>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
              >
                <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-black">
                  {course.category}
                </span>

                <h2 className="mt-5 text-2xl font-bold">
                  {course.title}
                </h2>

                <p className="mt-4 text-3xl font-bold text-amber-400">
                  ₹{course.price}
                </p>

                <button
                  onClick={() => navigate(`/watch-course/${course._id}`)}
                  className="mt-6 w-full rounded-xl bg-green-500 py-3 font-bold text-black transition hover:bg-green-400"
                >
                  Watch Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyCourses;