import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <section className="bg-slate-900 py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <h2 className="mb-8 text-4xl font-bold text-white">
          Find Your Next Chess Course
        </h2>

        <div className="flex overflow-hidden rounded-2xl bg-slate-800 shadow-xl">

          <input
            type="text"
            placeholder="Search openings, middlegame, endgames..."
            className="w-full bg-transparent px-6 py-5 text-lg text-white outline-none"
          />

          <button className="bg-amber-400 px-8 text-black transition hover:bg-amber-300">
            <FaSearch size={20} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;