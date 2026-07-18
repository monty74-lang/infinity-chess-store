import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center px-5 text-center sm:min-h-[85vh] sm:px-8">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
         className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          Premium Chess Courses
          <span className="block text-amber-400">
            All In One Place
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl px-2 text-base leading-8 text-slate-400 sm:text-xl"
        >
          Explore hundreds of premium chess courses covering openings,
          middlegame strategy, and endgames.
        </motion.p>
<div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

  <button
    onClick={() => navigate("/openings")}
    className="w-full rounded-xl bg-amber-400 px-8 py-4 text-lg font-bold text-black transition hover:scale-105 sm:w-auto"
  >
    Browse Courses
  </button>

  <a
    href="https://t.me/Yabuki_Joe19"
    className="w-full rounded-xl border border-white px-8 py-4 text-lg font-bold transition hover:bg-white hover:text-black sm:w-auto"
  >
    Contact on Telegram
  </a>

</div>

        <div className="mt-20 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-amber-400">
            <h2 className="text-4xl font-bold text-amber-400">
              500+
            </h2>

            <p className="mt-2 text-slate-400">
              Premium Courses
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-4xl font-bold text-amber-400">
              ₹999
            </h2>

            <p className="mt-2 text-slate-400">
              One-Time Payment
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-4xl font-bold text-amber-400">
              24/7
            </h2>

            <p className="mt-2 text-slate-400">
              Telegram Support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;