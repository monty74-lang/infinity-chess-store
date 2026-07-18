import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "Opening Repertoire",
    description: "Master every opening with premium opening repertoires.",
    route: "/openings",
  },
  {
    id: 2,
    title: "Middlegame Mastery",
    description: "Improve planning, calculation and positional understanding.",
    route: "/middlegame",
  },
  {
    id: 3,
    title: "Endgame Mastery",
    description: "Learn essential endgames and convert winning positions.",
    route: "/endgames",
  },
];

function FeaturedCourses() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
          Featured Categories
        </h2>

        <p className="mb-12 px-4 text-center text-slate-400 sm:mb-16">
          Choose a category to explore all available courses.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(course.route)}
              className="cursor-pointer overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-amber-500 to-amber-700 sm:h-40">
                <span className="text-5xl sm:text-7xl">♟</span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold sm:text-3xl">
                  {course.title}
                </h3>

                <p className="mt-4 text-slate-400">
                  {course.description}
                </p>

                <button className="mt-8 w-full rounded-xl bg-amber-400 py-3 text-base font-bold text-black transition hover:scale-105 sm:py-4 sm:text-lg">
                  Explore →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;