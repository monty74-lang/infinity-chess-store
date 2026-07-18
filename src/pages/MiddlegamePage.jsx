import { useState } from "react";
import Navbar from "../components/Navbar";
import CourseSearch from "../components/CourseSearch";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";
import TelegramButton from "../components/TelegramButton";
import SortCourses from "../components/SortCourses";

function MiddlegamePage() {
  const [search, setSearch] = useState("");
const [sort, setSort] = useState("az");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 sm:pt-16">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Middlegame Mastery
        </h1>

        <p className="mt-4 text-slate-400">
          Browse all middlegame courses.
        </p>
      </div>

      <CourseSearch
        search={search}
        setSearch={setSearch}
      />
<SortCourses
  sort={sort}
  setSort={setSort}
/>
      <CourseList
  category="Middlegame"
  search={search}
  sort={sort}
/>

      <div className="mx-auto my-20 max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center sm:p-8">
        <h2 className="text-3xl font-bold">
          Can't Find Your Course?
        </h2>

        <p className="mt-4 text-slate-400">
          Contact us directly on Telegram.
        </p>

        <a
          href="https://t.me/Yabuki_Joe19"
          className="mt-8 inline-block rounded-xl bg-sky-500 px-8 py-4 font-bold text-white"
        >
          Contact on Telegram
        </a>
        
      </div>
      <Footer />
      <TelegramButton />
    </div>
  );
}

export default MiddlegamePage;