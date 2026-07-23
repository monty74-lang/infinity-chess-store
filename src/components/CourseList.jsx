import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseList({ category, search, sort }) {
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(20);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("https://infinity-chess-store-backend.onrender.com/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.category === category &&
      course.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sort === "az") {
      return a.title.localeCompare(b.title);
    }

    return b.title.localeCompare(a.title);
  });

  return (
    <div className="mx-auto max-w-7xl px-8 pb-10">
      <div className="space-y-4">
        {sortedCourses.slice(0, visibleCourses).map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-2xl"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {course.title}
                </h3>

                <p className="mt-2 text-slate-400">
                  Premium Chess Course
                </p>

                <span className="mt-4 inline-block rounded-full bg-slate-800 px-4 py-1 text-sm text-white">
                  {course.category}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <h2 className="text-3xl font-bold text-amber-400 sm:text-4xl">
                  ₹{course.price}
                </h2>

                <Link
                  to={`/course/${course.id}`}
                  className="mt-5 inline-block w-full rounded-xl bg-amber-400 px-6 py-3 text-center font-bold text-black transition hover:scale-105 sm:w-auto"
                >
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}

        {visibleCourses < sortedCourses.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCourses((prev) => prev + 20)}
              className="rounded-xl bg-amber-400 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}

        {sortedCourses.length === 0 && (
          <div className="rounded-xl bg-slate-900 p-6 text-center text-slate-400">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;