function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-3">

        <div>
          <h2 className="text-xl font-bold text-amber-400 sm:text-2xl">
            Infinity Chess Store
          </h2>

          <p className="mt-4 text-slate-400">
            Premium chess courses for players of every level.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold sm:text-xl">
            Categories
          </h3>

          <ul className="mt-4 space-y-2 text-slate-400">
            <li>Opening Repertoire</li>
            <li>Middlegame Mastery</li>
            <li>Endgame Mastery</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Support
          </h3>

          <p className="mt-4 text-slate-400">
            Need help purchasing a course?
          </p>

          <a
            href="https://t.me/Yabuki_Joe19"
           className="mt-5 inline-block w-full rounded-lg bg-sky-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-sky-400 sm:w-auto"
          >
            Telegram
          </a>
        </div>

      </div>

      <div className="border-t border-slate-800 py-6 text-center text-slate-500">
        © 2026 Infinity Chess Store. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;