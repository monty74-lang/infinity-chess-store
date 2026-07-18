function SortCourses({ sort, setSort }) {
  return (
    <div className="mx-auto mt-6 mb-8 flex max-w-7xl justify-end px-8">
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
      >
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </select>
    </div>
  );
}

export default SortCourses;