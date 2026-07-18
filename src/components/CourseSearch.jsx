function CourseSearch({ search, setSearch }) {
  return (
    <div className="mx-auto max-w-7xl px-8 py-8">
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none focus:border-amber-400"
      />
    </div>
  );
}

export default CourseSearch;