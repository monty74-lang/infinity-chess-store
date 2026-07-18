import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TelegramButton from "../components/TelegramButton";
import courses from "../data/courses";

function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="flex h-[70vh] items-center justify-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>

        <span className="mt-5 inline-block rounded-full bg-amber-400 px-4 py-2 font-semibold text-black">
          {course.category}
        </span>

        <h2 className="mt-8 text-4xl font-bold text-amber-400 sm:text-5xl">
          ₹{course.price}
        </h2>

        <p className="mt-3 text-slate-400">
          One-time payment • Lifetime access
        </p>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          <h3 className="mb-6 text-2xl font-bold">
            What You'll Get
          </h3>

          <ul className="space-y-4 text-lg text-slate-300">
            <li>✅ Lifetime Access</li>
            <li>✅ One-Time Payment</li>
            <li>✅ Premium Chess Course</li>
            <li>✅ Telegram Purchase Support</li>
          </ul>

        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center sm:p-8">

          <h2 className="text-3xl font-bold">
            Ready to Purchase?
          </h2>

          <p className="mt-4 text-slate-400">
            Contact us on Telegram to purchase this course.
          </p>

          <a
            href="https://t.me/Yabuki_Joe19"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-full rounded-xl bg-sky-500 px-8 py-4 text-center font-bold text-white transition hover:bg-sky-400 sm:w-auto"
          >
            Buy Now via Telegram
          </a>

          <p className="mt-4 text-sm text-slate-500">
            Secure one-time payment • No subscription required
          </p>

        </div>

      </div>

      <Footer />
      <TelegramButton />
    </div>
  );
}

export default CourseDetails;